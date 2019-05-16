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
    const availableChunks = dateString.split(/-/);
    const dateObject = Reflect.construct(Date, [dateString]);
    return Intl.DateTimeFormat(navigator.language, {
      year:'numeric',
      month:availableChunks[1] && 'long',
      day:availableChunks[2] && 'numeric'
    }).format(dateObject)
  }
}

