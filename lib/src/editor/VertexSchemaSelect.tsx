import * as React from 'react'
import { Button, MenuItem } from '@blueprintjs/core';
import { Select, IItemRendererProps } from '@blueprintjs/select';
import { Model, Schema, IconRegistry } from '@alephdata/followthemoney';

interface ISelectSchemaProps {
  model: Model,
  schema: Schema,
  onSelect: (schema: Schema) => void
}

const SchemaSelect = Select.ofType<Schema>();

export class VertexSchemaSelect extends React.PureComponent<ISelectSchemaProps> {
  getSchemata(): Schema[] {
    const { model } = this.props
    const schemata = Object.keys(model.schemata).map((name) => model.schemata[name]) as Schema[]
    return schemata.filter((schema) => !schema.abstract && !schema.generated && !schema.isEdge)
    // console.log()
    // return schemata.filter((schema) => schema.isCreateable)
  }

  renderSchema(schema: Schema, { handleClick, modifiers }: IItemRendererProps) {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    // const iconPaths = IconRegistry.getIcon(schema.name.toLowerCase());
    // const icon = iconPaths && <svg viewBox={'0 0 24 24'} height={20} width={20}>{iconPaths.map(d => <path d={d}/>)}</svg>;
    return <MenuItem
      active={modifiers.active}
      key={schema.name}
      // icon={icon}
      onClick={handleClick}
      text={schema.label}
    />
  }

  render() {
    const { schema } = this.props
    
    return (
      <SchemaSelect
        filterable={false}
        items={this.getSchemata()}
        itemRenderer={this.renderSchema}
        onItemSelect={this.props.onSelect}
      >
        <Button text={schema.label} fill rightIcon='double-caret-vertical'/>
      </SchemaSelect>
    );
  }
}
