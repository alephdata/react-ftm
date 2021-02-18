import React from 'react';
import ReactDOM from 'react-dom';

import { EmbeddedElement } from 'embed/EmbeddedElement';
import { fetchExternalData } from 'embed/util';

export interface IRenderEmbedConfig {
  writeable?: boolean
  containerProps?: any
}

export interface IRenderEmbedProps {
  id: string
  type: string
  data?: any
  config?: IRenderEmbedConfig
}

export const renderEmbed = async (props: IRenderEmbedProps) => {
  const { id, type, data, config } = props;

  if (!data) {
    console.error('React-FTM Embed Error: no data provided');
    return;
  }

  let domElem = document.getElementById(id);
  if (!domElem) {
    domElem = document.createElement('div');
    domElem.setAttribute('id', id);
    document.body.appendChild(domElem);
  }

  ReactDOM.render(
    <div {...config?.containerProps}>
      <EmbeddedElement id={id} data={data} config={config} type={type} />
    </div>,
    domElem
  );
}
