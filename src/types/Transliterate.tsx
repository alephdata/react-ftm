import React from 'react';
import { Tooltip } from '@blueprintjs/core';


import './Transliterate.scss';

interface ITransliterateProps {
  value: string
  lookup?: any
}

class Transliterate extends React.PureComponent<ITransliterateProps> {
  constructor(props: ITransliterateProps) {
    super(props);

    this.copyText = this.copyText.bind(this);

  }
  onOpen = () => {
    document.addEventListener('copy', this.copyText);
  }

  onClose = () => {
    document.removeEventListener('copy', this.copyText);
  }

  copyText = (e: any) => {
    e.clipboardData.setData('text/plain', this.getTranslitValue());
    e.preventDefault();
  }

  getTranslitValue() {
    const { lookup, value } = this.props;
    return lookup[value];
  }

  render() {
    const { lookup, value } = this.props;
    if (!lookup || !lookup[value]) {
      return value;
    }
    const symbol = navigator.userAgent.indexOf('Mac OS X') != -1 ? '⌘' : 'Ctl';

    return (
      <>
        <Tooltip
          popoverClassName="Transliterate__popover bp3-minimal bp3-small"
          onOpening={this.onOpen}
          onClosing={this.onClose}
          content={(
            <>
              <span className="Transliterate__popover__main">{this.getTranslitValue()}</span>
              <span className="Transliterate__popover__secondary">
                <code>{symbol}</code>+<code>C</code> to copy
              </span>
            </>
          )}
        >
          <span className="Transliterate bp3-tooltip-indicator">
            {value}
          </span>
        </Tooltip>
      </>
    );
  }
}

export default Transliterate;
