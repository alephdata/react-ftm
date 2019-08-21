import React from 'react';

interface IEarliestProps {
  values:number[]
}

class Earliest extends React.PureComponent<IEarliestProps> {
  render() {
    const earliest = Math.min(...this.props.values);
    return <DateComponent value={earliest.toString()} />;
  }
}

interface IDateComponentProps {
  value:string
}

export class DateComponent extends React.PureComponent<IDateComponentProps> {
  static Earliest = Earliest;

  render() {
    const { value: dateString } = this.props;
    const dateObject:Date = new Date(dateString)
    return dateObject.toLocaleDateString()
  }
}
