import React from 'react';
import _ from 'lodash';
import { FormattedDate, FormattedTime, injectIntl, WrappedComponentProps } from 'react-intl';


interface IEarliestProps extends WrappedComponentProps {
  values:number[]
}

class Earliest extends React.PureComponent<IEarliestProps> {
  render() {
    const { intl, values } = this.props;
    const earliest = _.min(values);
    if (earliest) {
      return <Date value={earliest.toString()} intl={intl} />;
    } else {
      return <span>-</span>
    }
  }
}

interface IDateProps extends WrappedComponentProps {
  value:string
  showTime?: boolean
}

class Date extends React.PureComponent<IDateProps> {
  static Earliest = Earliest;

  render() {
    const { value: dateString, showTime } = this.props;
    if (!dateString) {
      return null;
    }
    const availableChunks = dateString.split(/-/);
    const dateObject = Reflect.construct(window.Date, [dateString]);
    return (
      <>
        <FormattedDate
          value={dateObject}
          year="numeric"
          month={availableChunks[1] && '2-digit'}
          day={availableChunks[2] && '2-digit'}
        />
        {showTime && (
          <>
            <span>-</span>
            <FormattedTime value={dateObject} />
          </>
        )}
      </>
    );
  }
}

export default injectIntl(Date);
