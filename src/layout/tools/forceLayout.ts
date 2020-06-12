import {forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY} from "d3-force";
import { IPositioningProps } from './common';
import getForceData from './getForceData';
import { Point, Vertex } from "../";


const forceLayout = (props:IPositioningProps): any => {
  const { center, nodes, links, groupingLinks } = getForceData(props);

  const simulation = forceSimulation(nodes)
  if (center) {
    simulation.force("x", forceX(center.x))
      .force("y", forceY(center.y))
  }
  simulation.force('links', forceLink(links).strength(1).distance(7))
    .force('groupingLinks', forceLink(groupingLinks).strength(.3).distance(4))
    .force("charge", forceManyBody().strength(-3))
    .stop()
    .tick(300)

  const positionVertex = (v:Vertex, i:number) => {
    const node = nodes.find(n => n.id === v.id);
    if (node) {
      return new Point(node.x, node.y)
    }
  };

  return { positionVertex };
}

export default forceLayout;
