import { renderDiagram } from 'embed/renderDiagram';

// renderDiagram({
//   id: 'diagram',
//   type: 'NetworkDiagram',
//   dataURL: undefined,
//   config: {
//     writeable: true,
//     containerProps: { style: { height: '100vh', width: '100vw' } }
//   }
// });

renderDiagram({
  id: 'table',
  type: 'TableEditor',
  dataURL: undefined,
  config: {
    writeable: true,
    containerProps: { style: { height: '100vh', width: '100vw' } }
  }
});
