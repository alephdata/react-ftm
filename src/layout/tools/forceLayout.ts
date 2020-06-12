import {forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY} from "d3-force";
import { IPositioningProps, getPositionFromSimulation } from './common';
import getForceData from './getForceData';
import { Point, Vertex } from "../";


const forceLayout = (props:IPositioningProps): any => {
  const { center, nodes, links, groupingLinks } = getForceData(props);

  const simulation = forceSimulation(nodes)
    .force("x", forceX(center.x))
    .force("y", forceY(center.y))
    .force('links', forceLink(links).strength(1).distance(10))
    .force('groupingLinks', forceLink(groupingLinks).strength(.3).distance(6))
    .force("charge", forceManyBody().strength(-3))
    .stop()
    .tick(300)

  return { positionVertex: getPositionFromSimulation(nodes) };
}

export default forceLayout;
