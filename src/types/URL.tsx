import React from 'react';
import { Icon } from '@blueprintjs/core';
import {getHost} from "../utils";

interface IURLProps {
  value:string
}

export class URL extends React.PureComponent<IURLProps> {
  onClick(e: React.MouseEvent) {
    e.stopPropagation()
  }

  render() {
    const { value, ...restProps } = this.props;
    if (!value) {
      return null;
    }
    const href = /^https?:\/\//i.test(value) ? value : `//${value}`;

    return (
      <a {...restProps} href={href} className="URL" rel="noopener noreferrer" target="_blank" title={value} onClick={this.onClick}>
        <Icon icon="link" iconSize={14} />
        {getHost(value)}
      </a>
    );
  }
}
