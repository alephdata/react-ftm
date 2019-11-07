import React from 'react';
import { GraphLayout } from '../layout';
import { GraphUpdateHandler, IGraphContext } from '../GraphContext';
import { PropertyEditor, VertexSchemaSelect } from '.';
import { PropertyValues } from '../types';
import { SelectProperty } from './SelectProperty';
import { Cell, Column, RenderMode, Table } from "@blueprintjs/table";
import { Button, Callout, Card, Popover, Position, Tab, Tabs } from "@blueprintjs/core";
import { Entity, Property, Schema } from "@alephdata/followthemoney";

import "./TableEditor.scss"

const propSort = (a:Property, b:Property) => (a.label > b.label ? 1 : -1);

interface ITableEditorProps {
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler,
}

interface ITableEditorState {
  schemata: Array<Schema>,
}

export class TableEditor extends React.Component<ITableEditorProps, ITableEditorState> {
  constructor(props: ITableEditorProps) {
    super(props);

    const { layout } = this.props;
    const schemata = layout.getEntities()
      .map(entity => entity.schema)
      .filter((schema, index, list) => list.indexOf(schema) === index)
      .sort((a, b) => a.label.localeCompare(b.label));

    this.state = {
      schemata,
    };

    this.addSchema = this.addSchema.bind(this);
  }

  addSchema(schema: Schema) {
    const schemata = [...this.state.schemata, ...[schema]]
      .sort((a, b) => a.label.localeCompare(b.label))
    this.setState({ schemata });
  }

  render() {
    const { layout, updateLayout } = this.props;
    const { schemata } = this.state;

    return (
      <div className="TableEditor">
        <Tabs vertical renderActiveTabPanelOnly>
          {schemata.map(schema => (
              <Tab
                id={schema.label}
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
                text="Add a schema type"
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

    return Array.from(new Set([...filledProps, ...featuredProps]))
      .sort(propSort);
  }

  onAddRow = () => {
    const { layout, schema, updateLayout } = this.props;
    const nextEntity = layout.model.createEntity(schema);

    layout.addEntity(nextEntity);
    updateLayout(layout, { modifyHistory:true });
  }

  onAddColumn(newColumn: Property) {
    this.setState(({visibleProps}) => ({
      visibleProps: [...visibleProps, ...[newColumn]].sort(propSort),
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


    return (
      <div className="TableEditor__contents">
            <Table
              renderMode={RenderMode.BATCH}
              numRows={numRows}
              enableGhostCells={false}
            >
              {visibleProps.map(property => <Column
                key={property.qname}
                name={property.label}
                cellRenderer={(i) => {
                  const entity = entities[i];
                  return (
                    <Cell>
                      <Popover
                        minimal
                        lazy
                        usePortal
                        interactionKind={'click'}
                        popoverClassName="TableEditor__popover"
                        position={Position.BOTTOM}
                        modifiers={{
                          inner: {enabled: true},
                        }}
                      >
                        <PropertyValues values={entity.getProperty(property)} prop={property} />
                        <PropertyEditor entity={entity} property={property} onEntityChanged={this.onEntityChanged} />
                      </Popover>
                    </Cell>
                  );
                }}
              />)}
            </Table>
      </div>
    )
  }
}
