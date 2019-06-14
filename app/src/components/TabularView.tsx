import React from 'react';
import {GraphContext, GraphLayout, GraphUpdateHandler, PropertyEditor, PropertyValues} from '@alephdata/vislib';
import {EditableCell, Column, Table, Cell} from "@blueprintjs/table";
import {Tab, Tabs, Popover, PopoverInteractionKind, Card} from "@blueprintjs/core";
import '@blueprintjs/table/lib/css/table.css'
import {Entity, Property, PropertyType, Schema} from "@alephdata/followthemoney";

export function TabularView() {
  const l = React.useContext(GraphContext);
  if (!l) return null;
  const {layout, updateLayout} = l;
  const {model} = layout;

  const schemata = Object.keys(model.schemata).map(model.getSchema.bind(model));

  return (<Tabs vertical>
    {schemata
      .filter(s => s.isThing())
      .filter(s => layout.getEntities().find(e => e.schema === s))
      .map(s => <Tab id={s.name} key={s.name} title={s.label} panel={<TableFor
        schema={s}
        updateLayout={updateLayout}
        layout={layout}
      />}/>)}
  </Tabs>)
}

interface ITableForProps {
  layout: GraphLayout
  schema: Schema
  updateLayout: GraphUpdateHandler
}

function TableFor({layout, schema, updateLayout}: ITableForProps) {
  const list = layout.getEntities().filter(e => e.schema.isA(schema));

  return <Table numRows={list.length} enableMultipleSelection={false}>
    {Array.from(schema.getProperties().entries()).map(p => <Column
      key={p[0]}
      name={p[0]}
      cellRenderer={(i) => {
        const entity = list[i];
        const property = p[1];
        return <Cell>
          <Popover interactionKind={PopoverInteractionKind.CLICK} content={<Card>
            <PropertyEditor entity={entity} property={property} onEntityChanged={(nextEntity)=>{
              layout.addEntity(nextEntity);
              updateLayout(layout)
            }} />
          </Card>}>
            <PropertyValues values={entity.getProperty(property)} prop={property} />
          </Popover>
        </Cell>
      }}
    />)}
  </Table>
}

interface ITypedCellProps {
  layout: GraphLayout
  entity: Entity
  property: Property
}

function TypedCell(props: ITypedCellProps) {
  return <TextCell {...props}/>
}

function TextCell(props: ITypedCellProps) {
  // return <Cell>davo</Cell>
  const possibleValue = props.entity.getFirst(props.property);
  return <Cell>{possibleValue && possibleValue.toString()}</Cell>
}