import { forceLink, forceManyBody, forceSimulation, forceY, forceCollide } from "d3-force";
import { scaleLinear } from 'd3-scale';
import { Point, Vertex } from "../";
import { IPositioningProps } from './common';
import getForceData from './getForceData';


const alignHorizontal = (props:IPositioningProps): any => {
  const { center, nodes, links, groupingLinks } = getForceData(props);

  const simulation = forceSimulation(nodes)
    .force("collide", forceCollide().radius(5).strength(.01))
    .force('links', forceLink(links).strength(.03))
    .force("y", forceY(center.y).strength(10))
    .force('groupingLinks', forceLink(groupingLinks).strength(2).distance(3))
    .force("charge", forceManyBody().strength(-2))
    .stop()
    .tick(300)

  const positionVertex = (v:Vertex, i:number) => {
    const node = nodes.find(n => n.id === v.id);
    if (node) {
      return new Point(node.x, node.y)
    }
  };

  const yOffsetScale = scaleLinear()
    .domain([1, 100])
    .range([2, 15]);

  const positionEdge = (e:Edge, i:number) => {
    const source = nodes.find(n => n.id === e.sourceId);
    const target = nodes.find(n => n.id === e.targetId);
    if (source && target) {
      const x = (source.x + target.x)/2;
      const xDistance = Math.abs(source.x - target.x);
      const yOffset = i%2 ? yOffsetScale(xDistance) : -yOffsetScale(xDistance);

      return new Point(x, center.y + yOffset);
    }
  };

  return { positionVertex, positionEdge };
}

export default alignHorizontal;
