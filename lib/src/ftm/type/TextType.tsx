import * as React from 'react'
import {Values} from "@alephdata/followthemoney";
import {ControlGroup, FormGroup, TagInput} from "@blueprintjs/core";
import {ITypeProps} from "./common";

export class TextType extends React.PureComponent<ITypeProps> {
  static group = new Set(['text', 'string'])

  onChange = (values: Array<string | React.ReactNode>) => {
    // TODO: @pudo maybe we need to implement Entity.removeProperty in FTM?
    this.props.onPropertyChanged(values as unknown as Values, this.props.property)
  }

  render() {
    const {property} = this.props;
    const label = property.description || property.label || property.name
    return <FormGroup label={label}>
      <ControlGroup vertical>
        <TagInput
          addOnBlur
          addOnPaste
          onChange={this.onChange}
          values={this.props.values}
        />
      </ControlGroup>
    </FormGroup>
  }
}
