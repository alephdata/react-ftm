import * as React from 'react'
import { ItemPredicate, ItemRenderer, Select } from '@blueprintjs/select';
import { MenuItem, Button, Position, Alignment } from '@blueprintjs/core';
import { Property } from '@alephdata/followthemoney';
import { highlightText, matchText } from '../utils';

const PropertySelect = Select.ofType<Property>()

interface ISelectPropertyProps {
  properties: Property[]
  onSelected: (property: Property) => void
}

export class SelectProperty extends React.PureComponent<ISelectPropertyProps> {

  itemPredicate: ItemPredicate<Property> = (query: string, property: Property) => {
    return matchText(`${property.name + property.description}`,query)
  }

  itemRenderer: ItemRenderer<Property> = (property, {handleClick, modifiers, query}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        key={property.name}
        onClick={(e: any) => { e.stopPropagation(); handleClick(e);}}
        text={highlightText(property.label, query)}
      />
    );
  }

  render() {
    const { properties } = this.props;
    const items = properties
      .sort((a, b) => a.label > b.label ? 1 : -1);
    return <PropertySelect
      popoverProps={{
        position: Position.BOTTOM_LEFT,
        minimal: true,
        targetProps: {style: {width: '100%'}}
      }}
      itemPredicate={this.itemPredicate}
      itemRenderer={this.itemRenderer}
      filterable={false}
      resetOnSelect={true}
      onItemSelect={this.props.onSelected}
      items={this.props.properties}>
      <Button icon='plus' text='Add a field' fill alignText={Alignment.LEFT} />
    </PropertySelect>
  }
}
