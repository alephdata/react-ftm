import React from 'react';
import _ from 'lodash';
import { FormattedDate, FormattedTime } from 'react-intl';


interface IEarliestProps {
  values:number[]
}

class Earliest extends React.PureComponent<IEarliestProps> {
  render() {
    const earliest = _.min(this.props.values);
    if (earliest) {
      return <Date value={earliest.toString()} />;
    } else {
      return <span>-</span>
    }
  }
}

interface IDateProps {
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

export default Date;
