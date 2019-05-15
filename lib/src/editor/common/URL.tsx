import React from 'react';
import { Icon } from '@blueprintjs/core';
import {getHost} from "../../utils";

import './URL.scss';

interface IURLProps {
  value:string
}

export class URL extends React.PureComponent<IURLProps> {
  render() {
    const { value, ...restProps } = this.props;
    if (!value) {
      return null;
    }

    return (
      <a {...restProps} href={value} className="URL" rel="noopener noreferrer" target="_blank" title={value}>
        <Icon icon="link" iconSize={14} />
        {getHost(value)}
      </a>
    );
  }
}

