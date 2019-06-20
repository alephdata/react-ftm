import React from 'react';
import {IGraphContext, PropertyEditor, PropertyValues, VertexSchemaSelect} from '@alephdata/vislib';
import {Cell, Column, RenderMode, Table} from "@blueprintjs/table";
import {Callout, Card, Popover, PopoverInteractionKind, Tab, Tabs} from "@blueprintjs/core";
import {Entity, Schema} from "@alephdata/followthemoney";
import '@blueprintjs/table/lib/css/table.css'


interface ITableEditorProps extends IGraphContext {
}



export const TableEditor = React.memo(function TableEditor(props: ITableEditorProps) {
  const {layout, updateLayout} = props;
  const [listedSchemata, setListedSchemata] = React.useState(
    React.useMemo(
      () => layout.getEntities()
        .map(entity => entity.schema)
        .filter((schema, index, list) => list.indexOf(schema) === index),
      [layout]
    )
  );

  return (<Tabs vertical renderActiveTabPanelOnly animate={false}>
    {listedSchemata
      .map(schema => <Tab
        id={schema.label}
        key={schema.name}
        title={schema.label}
        panel={<TableForSchema
          schema={schema}
          updateLayout={updateLayout}
          layout={layout}
        />}
      />)}
    <Callout>
      <VertexSchemaSelect
        model={layout.model}
        onSelect={schema => !listedSchemata.includes(schema) && setListedSchemata([...listedSchemata, schema])}
      />
    </Callout>
  </Tabs>)
})

interface ITableForSchemaProps extends IGraphContext {
  schema: Schema
}

function TableForSchema({layout, schema, updateLayout}: ITableForSchemaProps) {
  const entities = layout.getEntities()
    .filter(e => e.schema.isA(schema))
    .concat(layout.model.createEntity(schema)); //we do +1 to enable creating a new row

  const numRows = entities.length;
  const properties = Array.from(schema.getProperties().values());

  const onEntityChanged = (nextEntity: Entity) => {
    layout.addEntity(nextEntity);
    updateLayout(layout)
  }

  return <Table
    renderMode={RenderMode.BATCH}
    numRows={numRows}
    enableMultipleSelection={false}
    enableRowHeader={false}
  >
    {properties.map(property => <Column
      key={property.qname}
      name={property.name}
      cellRenderer={(i) => {
        const entity = entities[i];
        return <Cell>
          <Popover
            usePortal
            lazy
            interactionKind={PopoverInteractionKind.CLICK}
          >
            <PropertyValues values={entity.getProperty(property)} prop={property}/>
            <Card>
              <PropertyEditor entity={entity} property={property} onEntityChanged={onEntityChanged}/>
            </Card>
          </Popover>
        </Cell>
      }}
    />)}
  </Table>
}