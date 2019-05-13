import * as React from 'react'
import { Button, MenuItem, Alignment } from '@blueprintjs/core';
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
    const filtered = schemata.filter((schema) => schema.isCreateable && !schema.isEdge)
    return filtered.sort((a, b) => a.label.localeCompare(b.label))
  }

  static getIcon(schema: Schema) {
    const iconPaths = IconRegistry.getSchemaIcon(schema);
    return <svg viewBox={'0 0 24 24'} height={16} width={16}>{iconPaths
      .map((d, i) => <path key={i} d={d}/>)
    }/></svg>;
  }

  renderSchema(schema: Schema, { handleClick, modifiers }: IItemRendererProps) {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    return <MenuItem
      active={modifiers.active}
      key={schema.name}
      icon={VertexSchemaSelect.getIcon(schema)}
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
        <Button
          large
          text={schema.label}
          alignText={Alignment.LEFT}
          icon={VertexSchemaSelect.getIcon(schema)}
          rightIcon='double-caret-vertical'
        />
      </SchemaSelect>
    );
  }
}
