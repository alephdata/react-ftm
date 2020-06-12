import { forceLink, forceManyBody, forceSimulation, forceY } from "d3-force";
import { Point, Vertex } from "../";
import { IPositioningProps } from './common';
import getForceData from './getForceData';


const alignHorizontal = (props:IPositioningProps): any => {
  const { center, nodes, links, groupingLinks } = getForceData(props);

  const simulation = forceSimulation(nodes)
    .force("y", forceY(center.y).strength(10))
    .force('groupingLinks', forceLink(groupingLinks).strength(1).distance(3))
    .force("charge", forceManyBody().strength(-1))
    .stop()
    .tick(300)

  const positionVertex = (v:Vertex, i:number) => {
    const node = nodes.find(n => n.id === v.id);
    if (node) {
      return new Point(node.x, node.y)
    }
  };

  const positionEdge = (e:Edge, i:number) => {
    const source = nodes.find(n => n.id === e.sourceId);
    const target = nodes.find(n => n.id === e.targetId);
    if (source && target) {
      const x = (source.x + target.x)/2;
      const y = i%2 ? center.y + 5 : center.y - 5;
      return new Point(x, y);
    }
  };

  return { positionVertex, positionEdge };
}

export default alignHorizontal;
