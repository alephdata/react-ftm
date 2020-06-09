import { Edge, GraphLayout, Vertex } from "../";
import alignCircle from './alignCircle';
import alignHorizontal from './alignHorizontal';
import alignVertical from './alignVertical';
import arrangeTree from './arrangeTree';
import forceLayout from './forceLayout';


export interface ILayoutFunction {
  (vertices: Array<Vertex>, edges: Array<Edge>): any;
};

const positioning = {
  'alignCircle': alignCircle,
  'alignHorizontal': alignHorizontal,
  'alignVertical': alignVertical,
  'arrangeTree': arrangeTree,
  'forceLayout': forceLayout,
}

const positionSelection = (layout: GraphLayout, type: string, options?: any) => {
  let vertices, edges;
  if (layout.hasSelection()) {
    vertices = layout.getSelectedVertices().filter(v=>!v.isHidden());
    edges = layout.getSelectionAdjacentEdges();
  } else {
    vertices = layout.getVertices().filter(v=>!v.isHidden());
    edges = layout.getEdges();
  }

  const positioningFunc = positioning[type]({vertices, edges, options});

  return layout.applyPositioning(positioningFunc, vertices);
}

export default positionSelection;
