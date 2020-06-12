import { forceLink, forceManyBody, forceSimulation, forceY, forceX, forceRadial } from "d3-force";
import { IPositioningProps } from './common';
import getForceData from './getForceData';
import { Edge, Point, Rectangle, Vertex } from "../";

const alignCircle = (props:IPositioningProps): any => {
  const { center, nodes, links, groupingLinks } = getForceData(props);
  const radius = props.options?.radius || nodes.length;

  const simulation = forceSimulation(nodes)
    .force('groupingLinks', forceLink(groupingLinks).strength(1).distance(2))
    .force("charge", forceManyBody())
    .force("radial", forceRadial(radius, center.x, center.y).strength(3))
    // .force("collide", forceCollide().radius(5).strength(.01))
    // .force('links', forceLink(links).strength(.03))
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

export default alignCircle;
