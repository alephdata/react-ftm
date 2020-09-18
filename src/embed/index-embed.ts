import { renderDiagram } from '../index.ts';

renderDiagram({
  id: 'diagram',
  type: 'NetworkDiagram',
  dataURL: undefined,
  config: {
    writeable: true,
    containerProps: { style: { height: '100vh', width: '100vw' } }
  }
});
