import { renderEmbed } from 'embed/renderEmbed';

// renderEmbed({
//   id: 'diagram',
//   type: 'NetworkDiagram',
//   dataURL: undefined,
//   config: {
//     writeable: true,
//     containerProps: { style: { height: '100vh', width: '100vw' } }
//   }
// });

renderEmbed({
  id: 'table',
  type: 'EntityTable',
  dataURL: undefined,
  config: {
    writeable: true,
    containerProps: { style: { height: '100vh', width: '100vw' } }
  }
});
