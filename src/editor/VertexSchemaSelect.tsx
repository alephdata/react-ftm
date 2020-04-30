import * as React from 'react'
import { Button, MenuItem, Alignment, Position } from '@blueprintjs/core';
import { Select, IItemRendererProps } from '@blueprintjs/select';
import { Model, Schema as FTMSchema, IconRegistry } from '@alephdata/followthemoney';
import { Schema } from '../types';

interface ISelectSchemaProps {
  model: Model,
  placeholder?:string,
  schema?: FTMSchema,
  onSelect: (schema: FTMSchema) => void
  optionsFilter?: (schema: FTMSchema) => boolean
}

const SchemaSelect = Select.ofType<FTMSchema>();

export class VertexSchemaSelect extends React.PureComponent<ISelectSchemaProps> {
  getSchemata(): FTMSchema[] {
    const { model, optionsFilter } = this.props
    const schemata = model.getSchemata()
    const filtered = schemata.filter((schema) => {
      if (!optionsFilter || optionsFilter(schema)) {
        return !schema.abstract && !schema.isEdge;
      }
      return false;
    })
    return filtered.sort((a, b) => a.label.localeCompare(b.label))
  }

  renderSchema(schema: FTMSchema, { handleClick, modifiers }: IItemRendererProps) {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    return <MenuItem
      active={modifiers.active}
      key={schema.name}
      icon={<Schema.Icon schema={schema} />}
      onClick={handleClick}
      text={schema.label}
    />
  }

  render() {
    const { schema } = this.props

    return (
      <SchemaSelect
        popoverProps={{boundary:"viewport", position: Position.BOTTOM_LEFT, minimal: true}}
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
