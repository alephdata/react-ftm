import React from 'react';
import ReactDOM from 'react-dom';
import NetworkDiagram from './NetworkDiagram';
const fs = require('fs');

export function renderDiagram(id: string, type: string, dataURL: any, config: any) {
  console.log('rendering', id, dataURL, config);
  let diagramElem;

  const contents = fs.readFileSync(dataURL);
  // output[name] = JSON.parse(contents);

  switch (type) {
    case 'networkDiagram':
      diagramElem = <NetworkDiagram />
      break;
    default:
      diagramElem = <NetworkDiagram />
      break;
  }

  ReactDOM.render(
    diagramElem,
    document.getElementById(id)
  );
}
