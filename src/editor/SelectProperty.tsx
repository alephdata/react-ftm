import * as React from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { ItemPredicate, ItemRenderer, Select } from '@blueprintjs/select';
import { MenuItem, Button, Position, Alignment } from '@blueprintjs/core';
import { Property } from '@alephdata/followthemoney';
import { highlightText, matchText } from '../utils';

const messages = defineMessages({
  add: {
    id: 'editor.property_add',
    defaultMessage: 'Add a property',
  },
});

const PropertySelect = Select.ofType<Property>()

interface ISelectPropertyProps extends WrappedComponentProps  {
  properties: Property[]
  onSelected: (property: Property) => void
  buttonProps?: any
}

class SelectPropertyBase extends React.PureComponent<ISelectPropertyProps> {

  itemPredicate: ItemPredicate<Property> = (query: string, property: Property) => {
    return matchText(property.label, query)
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
    const { buttonProps, intl, properties } = this.props;
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
      filterable={true}
      resetOnSelect={true}
      onItemSelect={this.props.onSelected}
      items={this.props.properties}>
      <Button icon='plus' text={intl.formatMessage(messages.add)} fill alignText={Alignment.LEFT} {...buttonProps} />
    </PropertySelect>
  }
}

export const SelectProperty = injectIntl(SelectPropertyBase);
