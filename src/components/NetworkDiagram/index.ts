import { withTranslator } from 'utils'
import { NetworkDiagram as NetworkDiagramBase } from './NetworkDiagram';
const NetworkDiagram = withTranslator(NetworkDiagramBase);

export { NetworkDiagram };
export * from './GraphConfig';
export * from './Viewport';
export { GraphLayout } from './layout';
