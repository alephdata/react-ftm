import React from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { GraphLayout } from '../layout';
import { GraphUpdateHandler } from '../GraphContext';
import { VertexSchemaSelect } from './VertexSchemaSelect';
import { TableEditor } from './TableEditor';
import { EntityManager } from '../EntityManager';
import { Button, Classes, Drawer, Icon, Position, Tab, TabId, Tabs } from "@blueprintjs/core";
import { Entity, Schema } from "@alephdata/followthemoney";
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
}

interface ITableViewState {
  activeTabId: TabId,
  schemata: Array<Schema>,
  sort: any
}

export class TableViewBase extends React.Component<ITableViewProps, ITableViewState> {
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

    this.overloadedEntityManager = new EntityManager({
      createEntity: this.onEntityCreate.bind(this),
      updateEntity: this.onEntityUpdate.bind(this),
    });

    this.getEntities = this.getEntities.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
    this.onColumnSort = this.onColumnSort.bind(this);
    this.onEntityUpdate = this.onEntityUpdate.bind(this);
    this.onSelectionUpdate = this.onSelectionUpdate.bind(this);
  }

  getEntities(schema) {
    const { layout } = this.props;
    const { sort } = this.state;

    const entities = layout.getEntities()
      .filter(e => e.schema === schema);

    if (sort) {
      const = { field, direction } = sort;
      return entities.sort((a, b) => {
        if (direction === 'asc') {
          return a.getFirst(field) > b.getFirst(field) ? -1 : 1;
        } else {
          return a.getFirst(field) > b.getFirst(field) ? 1 : -1;
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

  onEntityCreate(entityData: any) {
    const { layout, updateLayout } = this.props;
    layout.createEntity(entity.id, true);
    updateLayout(layout, { created: [entity] }, { modifyHistory: true });
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

  onColumnSort(sort) {
    this.setState({ sort })
  }

  onSelectionUpdate(entity) {
    const { layout, updateLayout } = this.props;
    const entityId = entity.id;
    console.log('selecting', entityId)

    // select graphElement by entityId
    layout.selectVerticesByFilter((v) => v.entityId === entityId, true, true);
    updateLayout(layout, null, { clearSearch: true });
  }

  render() {
    const { actions, intl, isOpen, layout, updateLayout, writeable } = this.props;
    const { activeTabId, sort, schemata } = this.state;

    return (
      <div className="TableView">
        <Tabs
          renderActiveTabPanelOnly
          selectedTabId={activeTabId}
          onChange={this.setActiveTab}
        >
          {schemata.map(schema => (
              <Tab
                id={schema.name}
                key={schema.name}
                title={schema.plural}
                panel={(
                  <TableEditor
                    entities={this.getEntities(schema)}
                    schema={schema}
                    sort={sort}
                    sortColumn={this.onColumnSort}
                    selection={layout.getSelectedEntities().map(e => e.id)}
                    updateSelection={this.onSelectionUpdate}
                    writeable={writeable}
                    entityManager={this.overloadedEntityManager}
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
      </div>
    )
  }
}

export const TableView = injectIntl(TableViewBase);
