import * as React from 'react'
import {ItemPredicate, ItemRenderer, Select} from "@blueprintjs/select";
import {MenuItem, Button} from "@blueprintjs/core";
import {Property} from "@alephdata/followthemoney";
import {highlightText, matchText} from "../../utils";

const PropertySelect = Select.ofType<Property>()

interface ISelectPropertyProps {
  properties: Property[]
  onSelected: (property: Property) => void
}

export class SelectProperty extends React.PureComponent<ISelectPropertyProps> {

  itemPredicate:ItemPredicate<Property> = (query: string, property: Property) => {
    return matchText(`${property.name + property.description}`,query)
  }

  itemRenderer:ItemRenderer<Property> = (property, {handleClick, modifiers, query}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        key={property.name}
        onClick={handleClick}
        text={highlightText(property.label, query)}
      />
    );
  }

  render() {
    return <PropertySelect
      itemPredicate={this.itemPredicate}
      itemRenderer={this.itemRenderer}
      // filterable={false}
      resetOnSelect={true}
      onItemSelect={this.props.onSelected}
      items={this.props.properties}>
      <Button text="Add a field" fill rightIcon="double-caret-vertical" />
    </PropertySelect>
  }
}

