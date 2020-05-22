import { Edge, GraphLayout, Vertex } from "../";
import alignCircle from './alignCircle';
import alignHorizontal from './alignHorizontal';
import alignVertical from './alignVertical';
import arrangeTree from './arrangeTree';


export interface ILayoutFunction {
  (vertices: Array<Vertex>, edges: Array<Edge>): any;
};

const positioning = {
  'alignCircle': alignCircle,
  'alignHorizontal': alignHorizontal,
  'alignVertical': alignVertical,
  'arrangeTree': arrangeTree,
}

const positionSelection = (layout: GraphLayout, type: string) => {
  const vertices = layout.getSelectedVertices().filter(v=>!v.isHidden());
  const edges = layout.getSelectionAdjacentEdges();
  const positioningFunc = positioning[type]({vertices, edges});

  return layout.applyPositioning(positioningFunc, vertices);
}

export default positionSelection;
