import React from 'react';
import { GraphLayout } from '../layout';
import { GraphUpdateHandler, IGraphContext } from '../GraphContext';
import { PropertyEditor, VertexSchemaSelect } from '.';
import { PropertyValues } from '../types';
import { Cell, Column, RenderMode, Table } from "@blueprintjs/table";
import { Button, Callout, Card, Popover, Position, Tab, Tabs } from "@blueprintjs/core";
import { Entity, Property, Schema } from "@alephdata/followthemoney";

import "./TableEditor.scss"

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

class TableForSchema extends React.Component<ITableForSchemaProps> {
  render() {
    const {layout, schema, updateLayout} = this.props;
    const entities = layout.getEntities()
      .filter(e => e.schema === schema);
      // .concat(layout.model.createEntity(schema)); //we do +1 to enable creating a new row

    const numRows = entities.length;

    let filledProperties = entities.reduce((acc, entity: Entity) => [...acc, ...entity.getProperties()], [] as Property[]);
    let featuredProperties = schema.getFeaturedProperties();
    const properties = Array.from(new Set([...filledProperties, ...featuredProperties]))
      .sort((a, b) => (a.label > b.label ? 1 : -1));

    const onEntityChanged = (nextEntity: Entity) => {
      layout.addEntity(nextEntity);
      updateLayout(layout, { modifyHistory:true });
    }

    return (
      <div className="TableEditor__table">
        <Table
          renderMode={RenderMode.BATCH}
          numRows={numRows}
          enableMultipleSelection={false}
          enableGhostCells
          enableRowHeader
        >
          {properties.map(property => <Column
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
                    <PropertyEditor entity={entity} property={property} onEntityChanged={onEntityChanged} />
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
