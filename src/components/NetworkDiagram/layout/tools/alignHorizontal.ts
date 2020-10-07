import { forceLink, forceManyBody, forceSimulation, forceY, forceCollide } from "d3-force";
import { scaleLinear } from 'd3-scale';
import { Point, Edge } from "../";
import { IPositioningProps, getPositionFromSimulation } from './common';
import getForceData from './getForceData';


const alignHorizontal = (props:IPositioningProps): any => {
  const { center, nodes, links, groupingLinks } = getForceData(props);

  forceSimulation(nodes)
    .force("collide", forceCollide().radius(5).strength(.01))
    .force('links', forceLink(links).strength(.04))
    .force("y", forceY(center.y).strength(8))
    .force('groupingLinks', forceLink(groupingLinks).strength(2).distance(2))
    .force("charge", forceManyBody().strength(-2))
    .stop()
    .tick(300)

  const yOffsetScale = scaleLinear()
    .domain([1, 100])
    .range([2, 20]);

  const positionEdge = (e:Edge, i:number) => {
    const source = nodes.find((n:any) => n.id === e.sourceId);
    const target = nodes.find((n:any) => n.id === e.targetId);
    if (source && target) {
      const x = (source.x + target.x)/2;
      const xDistance = Math.abs(source.x - target.x);
      const yOffset = i%2 ? yOffsetScale(xDistance) : -yOffsetScale(xDistance);

      return new Point(x, center.y + yOffset);
    }
  };

  return { positionVertex: getPositionFromSimulation(nodes), positionEdge };
}

export default alignHorizontal;
