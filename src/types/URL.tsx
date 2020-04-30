import React from 'react';
import { Icon } from '@blueprintjs/core';
import { getHost } from "../utils";

import './URL.scss';

interface IURLProps {
  value: string
  onClick?: (e: React.MouseEvent) => void
}

class URL extends React.PureComponent<IURLProps> {
  render() {
    const { value, ...restProps } = this.props;
    if (!value) {
      return null;
    }
    const href = /^https?:\/\//i.test(value) ? value : `//${value}`;

    return (
      <a {...restProps} href={href} className="URL" rel="noopener noreferrer" target="_blank" title={value}>
        <Icon icon="link" iconSize={14} />
        {getHost(value)}
      </a>
    );
  }
}

export default URL
