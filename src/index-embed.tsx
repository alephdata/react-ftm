import { renderDiagram } from './index.ts';

renderDiagram(
  'diagram',
  'NetworkDiagram',
  undefined,
  {
    writeable: true,
    containerProps: { style: { height: '100vh', width: '100vw' } }
  }
);
