import React from 'react';
import { Tooltip } from '@blueprintjs/core';


// import './Transliterate.scss';

interface ITransliterateProps {
  value: string
  lookup?: any
}

class Transliterate extends React.PureComponent<ITransliterateProps> {
  render() {
    const { lookup, value } = this.props;

    if (!lookup || !lookup[value]) {
      return value;
    }
    return (
      <Tooltip content={lookup[value]}>
        <span className="Transliterate bp3-tooltip-indicator">
          {value}
        </span>
      </Tooltip>
    );
  }
}

export default Transliterate;
