import * as React from 'react'
import {Values} from '@alephdata/followthemoney';
import {DateInput, IDateFormatProps} from '@blueprintjs/datetime';
import {FormGroup, Position} from '@blueprintjs/core';
import {ITypeProps} from './common';

export class DateEdit extends React.PureComponent<ITypeProps> {
  static group = new Set(['date'])

  onChange = (value: Date) => {
    this.props.onPropertyChanged([value.toString()] as unknown as Values, this.props.property)
  };

  private jsDateFormatter: IDateFormatProps = {
    formatDate: date => date.toLocaleDateString(),
    parseDate: str => new Date(str),
    placeholder: 'YYYY-MM-DD',
  };

  render() {
    const {property, values} = this.props
    return <FormGroup label={property.label}>
      <DateInput
        {...this.jsDateFormatter}
        popoverProps={{
          position: Position.BOTTOM_LEFT,
          minimal: true,
          targetProps: {style: {width: '100%'}}
        }}
        value={values[0] ? new Date(values[0] as string) : undefined}
        onChange={this.onChange}
      />
    </FormGroup>
  }
}
