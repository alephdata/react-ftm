import React from 'react';
import ReactDOM from 'react-dom';
import NetworkDiagram from './NetworkDiagram';
import { fetchExternalData, fetchLocalData } from './common';

export const renderDiagram = async (id: string, type: string, dataURL?: string, config?: any) => {
  let data;
  if (dataURL) {
    data = await fetchExternalData(dataURL);
  } else {
    data = fetchLocalData() || require('./sample.vis');
  }

  let DiagramElem;
  switch (type) {
    default:
      DiagramElem = NetworkDiagram
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
      <DiagramElem data={data} config={config} />
    </div>,
    domElem
  );
}
