import {ItemPredicate, ItemRenderer, Suggest} from "@blueprintjs/select";
import {Property} from "@alephdata/followthemoney";
import React, {PureComponent} from "react";
import {FormGroup, MenuItem, NonIdealState} from "@blueprintjs/core";
import {highlightText} from "../../utils";
import {predicate} from "../type/common";

const PropertySuggest = Suggest.ofType<Property>()

interface ISelectPropertyProps {
  properties: Property[]
  onSelected: (property: Property) => void
}

export class SSelectProperty extends PureComponent<ISelectPropertyProps> {
  itemPredicate:ItemPredicate<Property> = (query: string, property: Property) => {
    return predicate(`${property.name + property.description}`,query)
  }

  itemRenderer:ItemRenderer<Property> = (property, {handleClick, modifiers, query}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    const label = property.description ? property.name : undefined;
    const text = property.description || property.name;
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        label={label}
        key={property.name}
        onClick={handleClick}
        text={highlightText(text, query)}
      />
    );
  }

  render() {
    return <FormGroup label="Add more properties">
      <PropertySuggest
        itemPredicate={this.itemPredicate}
        itemRenderer={this.itemRenderer}
        resetOnSelect={true}
        onItemSelect={this.props.onSelected}
        inputValueRenderer={p => p.name}
        items={this.props.properties}
        noResults={<NonIdealState
          icon="heart-broken"
          title="No search results"
          description="no such a property found, try using other Schemas"
        />}
      />
    </FormGroup>
  }
}

