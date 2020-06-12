// @ts-ignore
import * as dagre from 'dagre'
import { Edge, Point, Rectangle, Vertex } from "../";
import { IPositioningProps, getPositionFromSimulation } from './common';
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

  nodes.forEach((node:any) => g.setNode(node.id, node) )
  // @ts-ignore
  links.forEach((link:any) => g.setEdge(link.source.id, link.target.id))

  dagre.layout(g);
  
  return { positionVertex: getPositionFromSimulation(nodes) };
}

export default arrangeTree;
