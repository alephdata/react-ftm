import {forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY} from "d3-force";
import { Edge, GraphLayout, Point, Vertex } from "../";

const forceLayout = ({vertices, edges, options}:{ vertices: Array<Vertex>, edges: Array<Edge>, options?: any }): any => {
  const { center, maintainFixed } = options;
  const nodes = vertices
    .filter((vertex) => !vertex.isHidden())
    .map((vertex) => {
      const n = {id: vertex.id, radius: vertex.radius, fixed: vertex.fixed} as any
      if (maintainFixed && vertex.fixed) {
        n.fx = vertex.position.x;
        n.fy = vertex.position.y;
      }
      return n
    })
  const links = edges.map((edge) => {
    return {
      source: nodes.find((n) => n.id === edge.sourceId),
      target: nodes.find((n) => n.id === edge.targetId)
    }
  }).filter((link) => (link.source && link.target))

  const simulation = forceSimulation(nodes)
  if (center) {
    simulation.force("x", forceX(center.x))
      .force("y", forceY(center.y))
  }
  simulation.force('links', forceLink(links).strength(1).distance(4))
    .force("charge", forceManyBody().strength(-3).distanceMin(4))
    .stop()
    .tick(300)

  return (v:Vertex, i:number) => {
    const node = nodes.find(n => n.id === v.id);
    if (node) {
      return new Point(node.x, node.y)
    }
  };
}

export default forceLayout;
