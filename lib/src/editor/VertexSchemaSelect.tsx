import * as React from 'react'
import { Button, MenuItem, Alignment, Position } from '@blueprintjs/core';
import { Select, IItemRendererProps } from '@blueprintjs/select';
import { Model, Schema, IconRegistry } from '@alephdata/followthemoney';
import { SchemaIcon } from '../SchemaIcon';

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

    return (
      <SchemaSelect
        popoverProps={{position: Position.BOTTOM_LEFT, minimal: true}}
        filterable={false}
        items={this.getSchemata()}
        itemRenderer={this.renderSchema}
        onItemSelect={this.props.onSelect}
      >
        <Button
          large
          text={schema.label}
          alignText={Alignment.LEFT}
          icon={SchemaIcon.get(schema)}
          rightIcon='double-caret-vertical'
        />
      </SchemaSelect>
    );
  }
}
