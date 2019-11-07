import React from 'react';
import { GraphLayout } from '../layout';
import { GraphUpdateHandler, IGraphContext } from '../GraphContext';
import { PropertyEditor, VertexSchemaSelect } from '.';
import { PropertyValues } from '../types';
import { SelectProperty } from './SelectProperty';
import { Cell, Column, ColumnHeaderCell, RenderMode, SelectionModes, Table } from "@blueprintjs/table";
import { Button, Callout, Card, Icon, Intent, Popover, Position, Tab, TabId, Tabs, Tooltip } from "@blueprintjs/core";
import { Entity, Property, Schema } from "@alephdata/followthemoney";

import "./TableEditor.scss"

const propSort = (a:Property, b:Property) => (a.label > b.label ? 1 : -1);

interface ITableEditorProps {
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler,
}

interface ITableEditorState {
  activeTabId: TabId,
  schemata: Array<Schema>,
}

export class TableEditor extends React.Component<ITableEditorProps, ITableEditorState> {
  constructor(props: ITableEditorProps) {
    super(props);

    const { layout } = this.props;
    const schemata = layout.getEntities()
      .map(entity => entity.schema)
      .filter((schema, index, list) => !schema.isEdge && list.indexOf(schema) === index)
      .sort((a, b) => a.label.localeCompare(b.label));

    const activeTabId = schemata && schemata.length ? schemata[0].name : 0;

    this.state = { schemata, activeTabId };

    this.addSchema = this.addSchema.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
  }

  addSchema(schema: Schema) {
    const schemata = [...this.state.schemata, ...[schema]]
      .sort((a, b) => a.label.localeCompare(b.label))
    this.setState({ schemata, activeTabId: schema.name });
  }

  setActiveTab(newTabId: TabId) {
    this.setState({ activeTabId: newTabId });
  }

  render() {
    const { layout, updateLayout } = this.props;
    const { activeTabId, schemata } = this.state;

    return (
      <div className="TableEditor">
        <Tabs
          vertical
          renderActiveTabPanelOnly
          selectedTabId={activeTabId}
          onChange={this.setActiveTab}
        >
          {schemata.map(schema => (
              <Tab
                id={schema.name}
                key={schema.name}
                title={schema.label}
                panel={(
                  <TableForSchema
                    schema={schema}
                    layout={layout}
                    updateLayout={updateLayout}
                  />
                )}
              />
          ))}
          <div className="TableEditor__schemaAdd">
            <VertexSchemaSelect
              model={layout.model}
              onSelect={schema => this.addSchema(schema)}
              optionsFilter={(schema => !schemata.includes(schema))}
            >
              <Button
                text="Add an entity type"
                icon="plus"
              />
            </VertexSchemaSelect>
          </div>
        </Tabs>
      </div>
    )
  }
}


interface ITableForSchemaProps {
  schema: Schema
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler,
}

interface ITableForSchemaState {
  visibleProps: Array<Property>
}

class TableForSchema extends React.Component<ITableForSchemaProps, ITableForSchemaState> {
  constructor(props:ITableForSchemaProps) {
    super(props);

    this.state = {
      visibleProps: this.getVisibleProperties(),
    }

    this.onAddColumn = this.onAddColumn.bind(this);
  }

  getEntities() {
    const { layout, schema } = this.props;

    return layout.getEntities()
      .filter(e => e.schema === schema)
      .concat(layout.model.createEntity(schema));
  }

  getVisibleProperties() {
    const { schema } = this.props;
    const entities = this.getEntities();

    const filledProps = entities.reduce((acc, entity: Entity) => [...acc, ...entity.getProperties()], [] as Property[]);
    const featuredProps = schema.getFeaturedProperties();

    return Array.from(new Set([...featuredProps, ...filledProps]));
  }

  onAddRow = () => {
    const { layout, schema, updateLayout } = this.props;
    const nextEntity = layout.model.createEntity(schema);

    layout.addEntity(nextEntity);
    updateLayout(layout, { modifyHistory:true });
  }

  onDeleteRow = (entity: Entity) => {
    const { layout, schema, updateLayout } = this.props;

    layout.removeEntity(entity);
    updateLayout(layout, { modifyHistory:true });
  }

  onAddColumn(newColumn: Property) {
    this.setState(({visibleProps}) => ({
      visibleProps: [...visibleProps, ...[newColumn]],
    }));
  }

  onEntityChanged = (nextEntity: Entity) => {
    const { layout, updateLayout } = this.props;
    layout.addEntity(nextEntity);
    updateLayout(layout, { modifyHistory:true });
  }

  render() {
    const { layout, schema, updateLayout } = this.props;
    const { visibleProps } = this.state;

    const entities = this.getEntities();
    const numRows = entities.length;

    const otherProps = schema.getEditableProperties()
      .filter(prop => visibleProps.indexOf(prop) < 0)
      .sort(propSort);

    const columnWidths = new Array(visibleProps.length + 2);
    columnWidths[0] = 25;


    return (
      <div className="TableEditor__contents">
      {/*
        // @ts-ignore */}
        <Table
          numRows={numRows}
          enableGhostCells={false}
          selectionModes={SelectionModes.ROWS_AND_CELLS}
          enableMultipleSelection={false}
          columnWidths={columnWidths}
          defaultRowHeight={24}
        >
          <Column
            id="remove"
            columnHeaderCellRenderer={() => (
              <ColumnHeaderCell />
            )}
            cellRenderer={(i) => {
              const isLastCell = i === (numRows - 1);
              return (
                <Cell className="narrow">
                  <>
                    <Tooltip content={isLastCell ? "Add an entity" : "Delete this entity"}>
                      <Button
                        small
                        minimal
                        icon={isLastCell ? "new-object" : "graph-remove"}
                        onClick={isLastCell ? () => this.onAddRow() : () => this.onDeleteRow(entities[i])}
                      />
                    </Tooltip>
                  </>
                </Cell>
              );
            }}
          />
          {visibleProps.map(property => <Column
            key={property.qname}
            id={property.qname}
            name={property.label}
            cellRenderer={(i) => {
              const entity = entities[i];
              return (
                <Cell onKeyDown={(e) => console.log('asdasdasda')}>
                  {entity && (
                    <Popover
                      minimal
                      lazy
                      usePortal
                      interactionKind={'click'}
                      popoverClassName="TableEditor__popover"
                      position={Position.BOTTOM}
                      autoFocus={false}
                      modifiers={{
                        inner: {enabled: true},
                      }}
                    >
                      <PropertyValues values={entity.getProperty(property)} prop={property} />
                      <PropertyEditor entity={entity} property={property} onEntityChanged={this.onEntityChanged} />
                    </Popover>
                  )}
                </Cell>
              );
            }}
          />)}

          <Column
            id="add-field"
            cellRenderer={() => (
              <Cell className="TableEditor__ghostCell" />
            )}
            columnHeaderCellRenderer={() => (
              <ColumnHeaderCell>
                <SelectProperty
                  properties={otherProps}
                  onSelected={this.onAddColumn}
                  buttonProps={{minimal: true}}
                />
              </ColumnHeaderCell>
            )}
          />

        </Table>
      </div>
    )
  }
}
