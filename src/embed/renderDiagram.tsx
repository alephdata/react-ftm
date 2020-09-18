import React from 'react';
import ReactDOM from 'react-dom';
import NetworkDiagram from './NetworkDiagram';

const fetchExternal = (dataURL: string) => {
  return new Promise((resolve, reject) => {
    const data = fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error));
  })
}

export const renderDiagram = async (id: string, type: string, dataURL?: string, config?: any) => {
  const data = dataURL ? await fetchExternal(dataURL) : require('./sample.vis');

  let DiagramElem;
  switch (type) {
    default:
      DiagramElem = NetworkDiagram
      break;
  }

  ReactDOM.render(
    <DiagramElem data={data} config={config} />,
    document.getElementById(id)
  );
}
