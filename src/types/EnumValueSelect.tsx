import * as React from 'react'
import {Value, Values, Property, Entity} from "@alephdata/followthemoney";
import {ControlGroup, FormGroup, MenuItem, Position, TagInput} from "@blueprintjs/core";
import {ItemRenderer, MultiSelect} from "@blueprintjs/select";
import {ITypeProps} from "./common";
import {highlightText} from "../utils";
import {lab} from "d3-color";

const AbstractMultiSelect = MultiSelect.ofType<[string, string]>()

export class EnumValueSelect extends React.PureComponent<ITypeProps> {
  private inputRef: HTMLInputElement | null = null;

  constructor(props: any) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  componentDidMount() {
    this.inputRef && this.inputRef.focus();
  }

  onChange([countryId, label]: [string, string]) {
    const { values } = this.props;
    this.props.onSubmit([...values, ...[countryId]]);
  }

  getAvailableOptions() {
    const { values, property } = this.props;

    const optionsMap = new Map(property.type.values)
    values.forEach((valKey: any) => optionsMap.delete(valKey))

    return Array.from(optionsMap.entries())
      .sort((a, b) => a[1] > b[1] ? 1 : -1);
  }

  getIdLabelPairs() {
    const { property, values } = this.props;

    const fullCountriesMap = property.type.values

    return values.map((valKey: any) => {
      const countryLabel = fullCountriesMap.get(valKey)
      return [valKey, countryLabel] as [string, string]
    })
  }

  // blueprint function returns the tag label instead of the tag id
  onRemove(valToRemove: Value) {
    const { property, values } = this.props;

    const fullCountriesMap = property.type.values
    const toRemove = Array.from(fullCountriesMap.entries())
      .find(([key, val]) => val == valToRemove)

    if (toRemove) {
      const nextPropVals = [...values].filter(key => key !== toRemove[0]);
      this.props.onSubmit(nextPropVals as unknown as Values)
    }
  }

  render() {
    const { property } = this.props;

    const availableOptions = this.getAvailableOptions();
    const selectedOptions = this.getIdLabelPairs();

    return <FormGroup>
      <ControlGroup vertical fill >
        <AbstractMultiSelect
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
          popoverProps={{ minimal: true, position: Position.BOTTOM_LEFT, usePortal: false }}
          tagInputProps={{
            inputRef: (ref) => this.inputRef = ref,
            tagProps: {interactive: false, minimal: true, fill: true},
            onRemove: this.onRemove,
            placeholder: '',
          }}
          selectedItems={selectedOptions}
          openOnKeyDown
          resetOnSelect
          fill
        />
      </ControlGroup>
    </FormGroup>
  }
}
