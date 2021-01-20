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
  data?: any
  dataURL?: string
  config?: IRenderEmbedConfig
}

export const renderEmbed = async (props: IRenderEmbedProps) => {
  const { id, type, data, dataURL, config } = props;
  let embedData;

  if (data) {
    embedData = data;
  } else if (dataURL) {
    embedData = await fetchExternalData(dataURL);
  } else {
    embedData = fetchLocalData(id) || require('./sample.ftm');
  }

  let domElem = document.getElementById(id);
  if (!domElem) {
    domElem = document.createElement('div');
    domElem.setAttribute('id', id);
    document.body.appendChild(domElem);
  }

  ReactDOM.render(
    <div {...config?.containerProps}>
      <EmbeddedElement id={id} data={embedData} config={config} type={type} />
    </div>,
    domElem
  );
}
