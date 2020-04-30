import React from 'react';
import numeral from 'numeral';
import { FormattedNumber } from 'react-intl';

import './Numeric.scss';

interface INumericProps {
  num?:number,
  abbr?:boolean
}

class Numeric extends React.PureComponent<INumericProps> {
  render() {
    const { num, abbr = false } = this.props;

    if (num === undefined) {
      return null;
    }
    if (!Number.isFinite(1 * num)) {
      return <span className="Numeric">{num}</span>;
    }
    return (
      <span className="Numeric">
        {abbr ? numeral(num).format('0a') : <FormattedNumber value={num} />}
      </span>
    );
  }
}

export default Numeric;
