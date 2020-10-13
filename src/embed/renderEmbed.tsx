import React from 'react';
import ReactDOM from 'react-dom';
import NetworkDiagramWrapper from 'embed/NetworkDiagramWrapper';
import EntityTableWrapper from 'embed/EntityTableWrapper';

import { fetchExternalData, fetchLocalData } from 'embed/util';
import { IEmbeddedElementConfig } from './EmbeddedElement'

export interface IRenderEmbedProps {
  id: string
  type: string
  dataURL?: string
  config?: IEmbeddedElementConfig
}

export const renderEmbed = async (props: IRenderEmbedProps) => {
  const { id, type, dataURL, config } = props;
  let data;
  if (dataURL) {
    data = await fetchExternalData(dataURL);
  } else {
    data = fetchLocalData() || require('./sample.ftm');
  }

  let EmbeddedElement;
  switch (type) {
    case 'EntityTable':
      EmbeddedElement = EntityTableWrapper
      break;
    default:
      EmbeddedElement = NetworkDiagramWrapper
      break;
  }

  let domElem = document.getElementById(id);
  if (!domElem) {
    domElem = document.createElement('div');
    domElem.setAttribute('id', id);
    document.body.appendChild(domElem);
  }

  ReactDOM.render(
    <div {...config?.containerProps}>
      <EmbeddedElement data={data} config={config} />
    </div>,
    domElem
  );
}
