import { forceLink, forceManyBody, forceSimulation, forceX } from "d3-force";
import { Point, Vertex } from "../";
import { IPositioningProps } from './common';
import getForceData from './getForceData';


const alignVertical = (props:IPositioningProps): any => {
  const { center, nodes, links, groupingLinks } = getForceData(props);

  const simulation = forceSimulation(nodes)
    .force("x", forceX(center.x).strength(10))
    // .force('links', forceLink(links).strength(.1))
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
      const y = (source.y + target.y)/2;
      const x = i%2 ? center.x + 5 : center.x - 5;
      return new Point(x, y);
    }
  };

  return { positionVertex, positionEdge };
}

export default alignVertical;
