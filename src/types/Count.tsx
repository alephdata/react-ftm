import React from 'react';
import Numeric from './Numeric';
import c from 'classnames';

import './Count.scss';

interface ICountProps {
  count: number
  full?: boolean
  className?: string
  isPending?: boolean
}

class Count extends React.PureComponent<ICountProps> {
  render() {
    const { count, full = false, className, isPending } = this.props;

    if (!isPending && (count === undefined || count === 0)) {
      return null;
    }

    return (
      <span className={c('Count', 'bp3-tag', 'bp3-small', 'bp3-minimal', 'bp3-round', className)}>
        {isPending && <span>---</span>}
        {!isPending && <Numeric num={count} abbr={!full} />}
      </span>
    );
  }
}

export default injectIntl(Count);
