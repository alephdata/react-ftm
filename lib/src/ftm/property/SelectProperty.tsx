import React, {PureComponent} from "react";
import {ItemPredicate, ItemRenderer, Suggest} from "@blueprintjs/select";
import {FormGroup, MenuItem, NonIdealState} from "@blueprintjs/core";
import {Property} from "@alephdata/followthemoney";
import {highlightText} from "../../utils";
import {predicate} from "../type/common";

const PropertySuggest = Suggest.ofType<Property>()

interface ISelectPropertyProps {
  properties: Property[]
  onSelected: (property: Property) => void
}

export class SelectProperty extends PureComponent<ISelectPropertyProps> {
  itemPredicate:ItemPredicate<Property> = (query: string, property: Property) => {
    return predicate(`${property.name + property.description}`,query)
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

