import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import Numeric from './Numeric';
import c from 'classnames';

import './Count.scss';
import { Classes } from '@blueprintjs/core';

interface ICountProps extends WrappedComponentProps {
  count: number;
  full?: boolean;
  className?: string;
  isPending?: boolean;
  animate?: boolean;
}

class Count extends React.PureComponent<ICountProps> {
  render() {
    const { count, full = false, isPending, animate = false } = this.props;

    if (!isPending && count == null) {
      return null;
    }
    const showLoading = isPending && count == null;

    return (
      <span
        className={c('Count', Classes.TAG, Classes.SMALL, Classes.MINIMAL, Classes.ROUND, {
          [Classes.SKELETON]: showLoading,
        })}
      >
        {showLoading && <span>--</span>}
        {!showLoading && <Numeric num={count} abbr={!full} animate={animate} />}
      </span>
    );
  }
}

export default injectIntl(Count);
