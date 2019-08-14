import * as React from 'react'
import {Values, Property, Entity} from "@alephdata/followthemoney";
import {ControlGroup, FormGroup, MenuItem, Position, TagInput} from "@blueprintjs/core";
import {ItemRenderer, MultiSelect} from "@blueprintjs/select";
import {ITypeProps} from "./common";
import {highlightText} from "../utils";
import {lab} from "d3-color";

const CountryMultiSelect = MultiSelect.ofType<[string, string]>()


export class CountryEdit extends React.PureComponent<ITypeProps> {
  static group = new Set(['country'])

  constructor(props: any) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  onChange([countryId, label]) {
    const { values, property, onPropertyChanged } = this.props;
    // TODO: @pudo maybe we need to implement Entity.removeProperty in FTM?
    onPropertyChanged([...values, ...[countryId]] as unknown as Values, property)
  }

  getAvailableOptions() {
    const { values, property } = this.props;

    const optionsMap = new Map(property.type.values)
    values.forEach((valKey: string) => optionsMap.delete(valKey))

    return Array.from(optionsMap.entries());
  }

  getIdLabelPairs() {
    const { property, values } = this.props;

    const fullCountriesMap = property.type.values

    return values.map((valKey: string) => {
      const countryLabel = fullCountriesMap.get(valKey)
      return [valKey, countryLabel] as [string, string]
    })
  }

  // blueprint function returns the tag label instead of the tag id
  onRemove(valToRemove) {
    const { property, values, onPropertyChanged } = this.props;

    const fullCountriesMap = property.type.values
    const keyToRemove = Array.from(fullCountriesMap.entries())
      .find(([key, val]) => val == valToRemove)[0]

    const nextPropVals = [...values].filter(key => key !== keyToRemove);
    onPropertyChanged(nextPropVals as unknown as Values, property)
  }

  render() {
    const { property } = this.props;

    const availableOptions = this.getAvailableOptions();
    const selectedOptions = this.getIdLabelPairs();

    return <FormGroup>
      <ControlGroup vertical fill >
        <CountryMultiSelect
          tagRenderer={i => i[1]}
          onItemSelect={this.onChange}
          itemRenderer={(country, {handleClick, modifiers, query}) => {
            if (!modifiers.matchesPredicate) {
              return null;
            }
            const [key, label] = country;

            if (label.toLowerCase().includes(query.toLowerCase())) {
              return (
                <MenuItem
                  active={modifiers.active}
                  disabled={modifiers.disabled}
                  key={key}
                  onClick={handleClick}
                  text={highlightText(label, query)}
                />
              );
            } else {
              return null;
            }
          }}
          items={availableOptions}
          popoverProps={{ minimal: true, position: Position.BOTTOM_LEFT }}
          tagInputProps={{ tagProps: {interactive: false, minimal: true, fill: true}, onRemove: this.onRemove, placeholder: '' }}
          selectedItems={selectedOptions}
          openOnKeyDown
          resetOnSelect
        />
      </ControlGroup>
    </FormGroup>
  }
}
