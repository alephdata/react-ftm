import { forceLink, forceManyBody, forceSimulation, forceY, forceX, forceRadial } from "d3-force";
import { IPositioningProps, getPositionFromSimulation } from './common';
import getForceData from './getForceData';
import { Edge, Point, Rectangle, Vertex } from "../";

const alignCircle = (props:IPositioningProps): any => {
  const { center, nodes, links, groupingLinks } = getForceData(props);
  const radius = props.options?.radius || nodes.length;

  const simulation = forceSimulation(nodes)
    .force('groupingLinks', forceLink(groupingLinks).strength(1).distance(2))
    .force("charge", forceManyBody())
    .force("radial", forceRadial(radius, center.x, center.y).strength(3))
    .stop()
    .tick(300)

  return { positionVertex: getPositionFromSimulation(nodes) };
}

export default alignCircle;
