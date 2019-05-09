import React, {PureComponent, ReactNode} from "react";
import {Values} from "@alephdata/followthemoney";
import {ControlGroup, FormGroup, TagInput} from "@blueprintjs/core";
import {ITypeProps} from "./common";

export class TextType extends PureComponent<ITypeProps> {
  static group = new Set(['text', 'string'])

  onChange = (values: Array<string | ReactNode>) => {
    // TODO: @pudo maybe we need to implement Entity.removeProperty in FTM?
    this.props.onPropertyChanged(values as unknown as Values, this.props.property)
  }

  render() {
    const {property} = this.props;
    return <FormGroup
      label={property.description || property.label || property.name}
    >
      <ControlGroup
        vertical
      >
        <TagInput
          addOnPaste
          onChange={this.onChange}
          values={this.props.values}
        />
      </ControlGroup>
    </FormGroup>
  }
}
