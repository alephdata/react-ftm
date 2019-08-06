import * as React from 'react'
import {Values, Property, Entity} from "@alephdata/followthemoney";
import {ControlGroup, FormGroup, MenuItem, TagInput} from "@blueprintjs/core";
import {ItemRenderer, MultiSelect} from "@blueprintjs/select";
import {ITypeProps} from "./common";
import {highlightText} from "../utils";
import {lab} from "d3-color";

const CountryMultiSelect = MultiSelect.ofType<[string, string]>()


export class CountryEdit extends React.PureComponent<ITypeProps> {
  static group = new Set(['country'])

  onChange = (values: Array<string | React.ReactNode>) => {
    console.log(values)
    // TODO: @pudo maybe we need to implement Entity.removeProperty in FTM?
    this.props.onPropertyChanged(values as unknown as Values, this.props.property)
  }

  render() {
    const {property} = this.props;
    return <FormGroup label={property.label} >
      <ControlGroup vertical fill >
        <CountryMultiSelect
          tagRenderer={i => i[1]}
          onItemSelect={this.onChange}
          itemRenderer={(country, {handleClick, modifiers, query}) => {
            if (!modifiers.matchesPredicate) {
            return null;
          }
            const [label, text] = country;
            return (
            <MenuItem
              active={modifiers.active}
              disabled={modifiers.disabled}
              label={label}
              key={label}
              onClick={handleClick}
              text={highlightText(text, query)}
            />
            );
          }}
          items={Array.from(property.type.values.entries())}
        />
      </ControlGroup>
    </FormGroup>
  }
}
