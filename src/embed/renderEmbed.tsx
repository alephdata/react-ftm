import React from 'react';
import ReactDOM from 'react-dom';

import { EmbeddedElement } from 'embed/EmbeddedElement';
import { fetchExternalData, fetchLocalData } from 'embed/util';

export interface IRenderEmbedConfig {
  writeable?: boolean
  containerProps?: any
}

export interface IRenderEmbedProps {
  id: string
  type: string
  dataURL?: string
  config?: IRenderEmbedConfig
}

export const renderEmbed = async (props: IRenderEmbedProps) => {
  const { id, type, dataURL, config } = props;
  let data;
  if (dataURL) {
    data = await fetchExternalData(dataURL);
  } else {
    data = fetchLocalData(id) || require('./sample.ftm');
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
