import React, {PureComponent} from "react";
import {Values} from "@alephdata/followthemoney";
import {DateInput, IDateFormatProps} from "@blueprintjs/datetime";
import {FormGroup} from "@blueprintjs/core";
import {ITypeProps} from "./common";

export class DateType extends PureComponent<ITypeProps> {
  static group = new Set(['date'])
  onChange = (value: Date) => {
    this.props.onPropertyChanged([value.toString()] as unknown as Values, this.props.property)
  };
  private jsDateFormatter: IDateFormatProps = {
    formatDate: date => date.toLocaleDateString(),
    parseDate: str => new Date(str),
    placeholder: "M/D/YYYY",
  };

  render() {
    const {property, values} = this.props;

    return <FormGroup
      label={property.description || property.label || property.name}
    >
      <DateInput
        {...this.jsDateFormatter}
        value={values[0] ? new Date(values[0] as string) : undefined}
        onChange={this.onChange}
      />
    </FormGroup>
  }
}
