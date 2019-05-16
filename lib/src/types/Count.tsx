import React from 'react';

import { Numeric } from './index';

interface ICountProps {
  count:number
  full?:boolean
}

export class Count extends React.PureComponent<ICountProps> {
  render() {
    const { count, full = false } = this.props;

    if (count === undefined || count === 0) {
      return null;
    }

    return (
      <span className="Count bp3-tag bp3-round">
        <Numeric num={count} abbr={!full} />
      </span>
    );
  }
}

