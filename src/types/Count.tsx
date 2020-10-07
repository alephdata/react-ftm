import React from 'react';
import {injectIntl, WrappedComponentProps } from 'react-intl';
import Numeric from './Numeric';
import c from 'classnames';

import './Count.scss';

interface ICountProps extends WrappedComponentProps {
  count: number
  full?: boolean
  className?: string
  isPending?: boolean
}

class Count extends React.PureComponent<ICountProps> {
  render() {
    const { count, full = false, isPending } = this.props;

    if (!isPending && count == null) {
      return null;
    }
    const showLoading = isPending && count == null;

    return (
      <span className={c('Count', 'bp3-tag', 'bp3-small', 'bp3-minimal', 'bp3-round', {"bp3-skeleton": showLoading})}>
        {showLoading && <span>--</span>}
        {!showLoading && <Numeric num={count} abbr={!full} />}
      </span>
    );
  }
}

export default injectIntl(Count);
