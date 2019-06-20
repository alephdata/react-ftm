import React from 'react';
import {IGraphContext, PropertyEditor, PropertyValues, VertexSchemaSelect} from '@alephdata/vislib';
import {Cell, Column, RenderMode, Table} from "@blueprintjs/table";
import {Card, Popover, PopoverInteractionKind, Tab, Tabs} from "@blueprintjs/core";
import {Entity, Schema} from "@alephdata/followthemoney";

import '@blueprintjs/table/lib/css/table.css'


interface ITableEditorProps extends IGraphContext {
}


export const TableEditor = React.memo(function TableEditor(props: ITableEditorProps) {
  let {layout, updateLayout} = props;
  const [listedSchemata, setListedSchemata] = React.useState(
    React.useMemo(() => layout.getEntities()
        .map(entity => entity.schema)
        .filter((schema, index, list) => list.indexOf(schema) === index),
      [layout])
  );
  console.log(listedSchemata)
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
    <VertexSchemaSelect
      model={layout.model}
      onSelect={schema => {
        !listedSchemata.includes(schema) && setListedSchemata([...listedSchemata, schema])
      }}
    />
  </Tabs>)
})

interface ITableForSchemaProps extends IGraphContext {
  schema: Schema
}

function TableForSchema({layout, schema, updateLayout}: ITableForSchemaProps) {
  const entities = layout.getEntities()
    .filter(e => e.schema.isA(schema));

  const numRows = entities.length;
  const properties = Array.from(schema.getProperties().values());
  // const properties = schema.getFeaturedProperties()

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
        console.count('Cell rendered')
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