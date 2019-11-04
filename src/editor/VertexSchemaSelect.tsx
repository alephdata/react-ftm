import * as React from 'react'
import { Button, MenuItem, Alignment, Position } from '@blueprintjs/core';
import { Select, IItemRendererProps } from '@blueprintjs/select';
import { Model, Schema, IconRegistry } from '@alephdata/followthemoney';
import { SchemaIcon } from '../types';

interface ISelectSchemaProps {
  model: Model,
  placeholder?:string,
  schema?: Schema,
  onSelect: (schema: Schema) => void
  optionsFilter?: (schema: Schema) => boolean
}

const SchemaSelect = Select.ofType<Schema>();

export class VertexSchemaSelect extends React.PureComponent<ISelectSchemaProps> {
  getSchemata(): Schema[] {
    const { model, optionsFilter } = this.props
    const schemata = model.getSchemata()
    const filtered = schemata.filter((schema) => {
      if (!optionsFilter || optionsFilter(schema)) {
        return schema.isCreateable && !schema.isEdge;
      }
      return false;
    })
    return filtered.sort((a, b) => a.label.localeCompare(b.label))
  }

  renderSchema(schema: Schema, { handleClick, modifiers }: IItemRendererProps) {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    return <MenuItem
      active={modifiers.active}
      key={schema.name}
      icon={SchemaIcon.get(schema)}
      onClick={handleClick}
      text={schema.label}
    />
  }

  render() {
    const { schema } = this.props

    console.log(this.props.children);

    return (
      <SchemaSelect
        popoverProps={{position: Position.BOTTOM_LEFT, minimal: true}}
        filterable={false}
        items={this.getSchemata()}
        itemRenderer={this.renderSchema}
        onItemSelect={this.props.onSelect}
      >
        {this.props.children}
      </SchemaSelect>
    );
  }
}
