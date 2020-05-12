import React from 'react';
import _ from 'lodash';
import moment from 'moment';


interface IEarliestProps {
  values:number[]
}

class Earliest extends React.PureComponent<IEarliestProps> {
  render() {
    const { values } = this.props;
    const earliest = _.min(values);
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
    const dateObj = moment(dateString);
    if (!dateObj.isValid()) {
      return dateString;
    }
    const formatString = showTime ? "YYYY-M-D H:m" : "YYYY-M-D";
    return dateObj.format(formatString);
  }
}

export default Date;
