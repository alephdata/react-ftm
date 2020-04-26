import React from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { GraphLayout } from '../layout';
import { GraphUpdateHandler } from '../GraphContext';
import { VertexSchemaSelect } from './VertexSchemaSelect';
import { TableEditor } from './TableEditor';
import { EntityManager } from '../EntityManager';
import { Button, Classes, Drawer, Icon, Position, Tab, TabId, Tabs, Toaster } from "@blueprintjs/core";
import { Entity, IEntityDatum, Schema } from "@alephdata/followthemoney";
import { SchemaLabel } from '../types';
import { SortType } from './SortType';
import c from 'classnames';

import "./TableView.scss"

const messages = defineMessages({
  add: {
    id: 'table_editor.add_schema',
    defaultMessage: 'Add an entity type',
  },
});

interface ITableViewProps extends WrappedComponentProps {
  isOpen: boolean,
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler,
  writeable: boolean,
  actions: any,
  toggleTableView: () => void
}

interface ITableViewState {
  activeTabId: TabId,
  schemata: Array<Schema>,
  sort: SortType | null
}

export class TableViewBase extends React.Component<ITableViewProps, ITableViewState> {
  private localEntityManager: EntityManager

  constructor(props: ITableViewProps) {
    super(props);

    const { layout } = this.props;
    const schemata = layout.getEntities()
      .map(entity => entity.schema)
      .filter((schema, index, list) => !schema.isEdge && list.indexOf(schema) === index)
      .sort((a, b) => a.label.localeCompare(b.label));

    const activeTabId = schemata && schemata.length ? schemata[0].name : 0;

    this.state = {
      schemata,
      activeTabId,
      sort: null,
    };

    this.localEntityManager = new EntityManager({
      createEntity: this.onEntityCreate.bind(this),
      updateEntity: this.onEntityUpdate.bind(this),
      getEntitySuggestions: this.fetchEntitySuggestions.bind(this),
      resolveEntityReference: this.resolveEntityReference.bind(this),
    });

    this.getEntities = this.getEntities.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
    this.onColumnSort = this.onColumnSort.bind(this);
    this.onEntityUpdate = this.onEntityUpdate.bind(this);
    this.onSelectionUpdate = this.onSelectionUpdate.bind(this);
  }

  getEntities(schema: Schema) {
    const { layout } = this.props;
    const { sort } = this.state;

    const entities = layout.getEntities()
      .filter(e => e.schema === schema);

    if (sort) {
      const { field, direction } = sort;
      return entities.sort((a, b) => {
        const aVal = a?.getFirst(field) as string;
        const bVal = b?.getFirst(field) as string;

        if (!aVal) return 1;
        if (!bVal) return -1;

        if (direction === 'asc') {
          return aVal.toLowerCase() < bVal.toLowerCase() ? -1 : 1;
        } else {
          return aVal.toLowerCase() < bVal.toLowerCase() ? 1 : -1;
        }
      });
    } else {
      return entities;
    }
  }

  addSchema(schema: Schema) {
    const schemata = [...this.state.schemata, ...[schema]]
      .sort((a, b) => a.label.localeCompare(b.label))
    this.setState({ schemata, activeTabId: schema.name });
  }

  setActiveTab(newTabId: TabId) {
    //FIX: clear sort?, clear selection?
    this.setState({ activeTabId: newTabId });
  }

  async onEntityCreate(entityData: IEntityDatum) {
    const { layout, updateLayout } = this.props;
    const entity = await layout.createEntity(entityData);

    updateLayout(layout, { created: [entity] }, { modifyHistory: true });
    return entity;
  }

  onEntityDelete(entity: Entity) {
    const { layout, updateLayout } = this.props;
    layout.removeEntity(entity.id, true);
    updateLayout(layout, { deleted: [entity] }, { modifyHistory: true });
  }

  onEntityUpdate(entity: Entity) {
    const { layout, updateLayout } = this.props;

    layout.updateEntity(entity);
    updateLayout(layout, { updated: [entity] }, { modifyHistory: true });
  }

  fetchEntitySuggestions({ query, schema }: { query: string, schema?: Schema }): Promise<Entity[]> {
    const { layout } = this.props;

    const entities = layout.getEntities()
      .filter(e => e.schema.isA(schema))
      .sort((a, b) => a.getCaption().toLowerCase() > b.getCaption().toLowerCase() ? 1 : -1);


    //   const { property, entity } = this.props;
    //   const selectedIds = this.getSelectedEntities().map(e => e.id);
    //   let excludeIds: string[] = [...[entity.id], ...selectedIds];
    //
    //   // exclude source and target entities from options (to avoid self-referential edges)
    //   if (entity.schema.edge) {
    //     const {source, target} = entity.schema.edge
    //     const sourceProp = entity.schema.getProperty(source)
    //     const targetProp = entity.schema.getProperty(target)
    //     const sourceEntity = entity.getFirst(sourceProp) as string
    //     const targetEntity = entity.getFirst(targetProp) as string
    //     excludeIds = [...excludeIds, ...[sourceEntity], ...[targetEntity]];
    //   }
    //   return Array.from(this.props.entities.values())
    //     .filter(e => e.schema.isA(property.getRange()) && !this.props.values.includes(e.id) && excludeIds.indexOf(e.id) === -1)
    //     .sort((a, b) => a.getCaption().toLowerCase() > b.getCaption().toLowerCase() ? 1 : -1);
    return new Promise((resolve) => resolve(entities));
  }

  resolveEntityReference(entityId: string): Entity | undefined {
    const { layout } = this.props;

    return layout.entities.get(entityId);
  }

  onColumnSort(newField: string) {
    this.setState(({ sort }) => {
      if (sort?.field !== newField) {
        return {sort: { field: newField, direction: 'asc'}};
      }
      if (sort?.direction === 'asc') {
        return {sort: { field: sort.field, direction: 'desc'}};
      } else {
        return {sort: null};
      }
    });
  }

  onSelectionUpdate(entity: Entity) {
    const { layout, updateLayout } = this.props;

    // select graphElement by entityId
    layout.selectVerticesByFilter((v) => v.entityId === entity.id, true, true);
    updateLayout(layout, null, { clearSearch: true });
  }

  render() {
    const { actions, intl, isOpen, layout, toggleTableView, updateLayout, writeable } = this.props;
    const { activeTabId, sort, schemata } = this.state;

    return (
      <Drawer
        className="TableView"
        isOpen={isOpen}
        hasBackdrop={false}
        position={Position.BOTTOM}
        autoFocus={false}
        enforceFocus={false}
        usePortal={false}
      >
        <Button
          className="TableView__close"
          icon="cross"
          minimal
          onClick={toggleTableView}
        />
        <Tabs
          renderActiveTabPanelOnly
          selectedTabId={activeTabId}
          onChange={this.setActiveTab}
        >
          {schemata.map(schema => (
              <Tab
                id={schema.name}
                key={schema.name}
                title={<SchemaLabel schema={schema} icon />}
                panel={(
                  <TableEditor
                    entities={this.getEntities(schema)}
                    schema={schema}
                    sort={sort}
                    sortColumn={this.onColumnSort}
                    selection={layout.getSelectedEntities()}
                    updateSelection={this.onSelectionUpdate}
                    writeable={writeable}
                    entityManager={this.localEntityManager}
                  />
                )}
              />
          ))}
          {writeable && (
            <div className="TableView__schemaAdd">
              <VertexSchemaSelect
                model={layout.entityManager.model}
                onSelect={schema => this.addSchema(schema)}
                optionsFilter={(schema => !schemata.includes(schema))}
              >
                <Button
                  text={intl.formatMessage(messages.add)}
                  icon="plus"
                />
              </VertexSchemaSelect>
            </div>
          )}
        </Tabs>
      </Drawer>
    )
  }
}

export const TableView = injectIntl(TableViewBase);
