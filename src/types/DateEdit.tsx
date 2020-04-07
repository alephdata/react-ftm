import * as React from 'react'
import {Values} from '@alephdata/followthemoney';
import {DateInput, IDateFormatProps} from '@blueprintjs/datetime';
import {FormGroup, Position} from '@blueprintjs/core';
import moment from 'moment';
import {ITypeProps} from './common';

export class DateEdit extends React.Component<ITypeProps> {
  static group = new Set(['date'])
  private inputRef: HTMLInputElement | null = null;

  componentDidMount() {
    this.inputRef && this.inputRef.focus();
  }

  onChange = (value: Date, isUserChange: boolean) => {
    if (isUserChange) {
      if (value instanceof Date) {
        this.props.onSubmit([moment(value).format('YYYY-MM-DD')] as unknown as Values)
      } else {
        this.props.onSubmit([] as unknown as Values)
      }
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
          targetProps: {style: {width: '100%'}},
          usePortal: false,
        }}
        value={values[0] ? new Date(values[0] as string) : undefined}
      />
    </FormGroup>
  }
}
