// @ts-ignore
import * as dagre from 'dagre'
import { Edge, Point, Rectangle, Vertex } from "../";
import { IPositioningProps } from './common';
import getForceData from './getForceData';


const arrangeTree = (props:IPositioningProps):any => {
  const { center, nodes, links, groupingLinks } = getForceData(props);

  const g = new dagre.graphlib.Graph({
    multigraph:true,
    directed:true,
  });

  g.setGraph({
    nodesep: 6, edgesep:3, ranksep:9,
    ranker: 'longest-path'
  });

  g.setDefaultEdgeLabel(function() { return {}; });

  nodes.forEach(node => g.setNode(node.id, node) )
  // @ts-ignore
  links.forEach(link => g.setEdge(link.source.id, link.target.id))

  dagre.layout(g);

  const positionVertex = (v:Vertex, i:number) => {
    const node = nodes.find(n => n.id === v.id);
    if (node) {
      return new Point(node.x, node.y)
    }
  };
  return { positionVertex };
}

export default arrangeTree;
