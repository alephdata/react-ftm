import * as React from 'react'
import {Values} from '@alephdata/followthemoney';
import {DateInput, IDateFormatProps} from '@blueprintjs/datetime';
import {FormGroup, Position} from '@blueprintjs/core';
import {ITypeProps} from './common';

export class DateEdit extends React.Component<ITypeProps> {
  static group = new Set(['date'])
  private inputRef: HTMLInputElement | null = null;

  componentDidMount() {
    this.inputRef && this.inputRef.focus();
  }

  onChange = (value: Date) => {
    if (value instanceof Date) {
      this.props.onPropertyChanged([value.toString()] as unknown as Values, this.props.property)
    } else {
      this.props.onPropertyChanged(['-'] as unknown as Values, this.props.property)
    }
  };

  private jsDateFormatter: IDateFormatProps = {
    formatDate: date => date.toLocaleDateString(),
    parseDate: str => new Date(str)
  };

  render() {
    const {property, values} = this.props
    return <FormGroup>
      <DateInput
        {...this.jsDateFormatter}
        className="date-input"
        inputProps={{ inputRef: (ref) => this.inputRef = ref }}
        minDate={new Date(1900, 1, 1)}
        onChange={this.onChange}
        popoverProps={{
          position: Position.BOTTOM_LEFT,
          minimal: true,
          targetProps: {style: {width: '100%'}}
        }}
        value={values[0] ? new Date(values[0] as string) : undefined}
      />
    </FormGroup>
  }
}
