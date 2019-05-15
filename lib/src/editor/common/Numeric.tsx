import React from 'react';
import numeral from 'numeral';


interface INumericProps {
  num?:number,
  abbr?:boolean
}

export class Numeric extends React.PureComponent<INumericProps> {
  render() {
    const { num, abbr = false } = this.props;

    const styles:React.CSSProperties = {
      fontVariantNumeric:'tabular-nums'
    }
    if (num === undefined) {
      return null;
    }
    if (!Number.isFinite(1 * num)) {
      return <span style={styles}>{num}</span>;
    }
    return (
      <span style={styles}>
        {abbr ? numeral(num).format('0a') : Intl.NumberFormat(navigator.language).format(num)}
      </span>
    );
  }
}


