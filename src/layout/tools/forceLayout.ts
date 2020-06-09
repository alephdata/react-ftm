import {forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY} from "d3-force";
import {Vertex} from "../Vertex";
import {Point} from "../Point";
import {GraphLayout} from "../GraphLayout";

const forceLayout = (layout:GraphLayout, options: any): GraphLayout => {
  const { center, maintainFixed } = options;
  const nodes = layout.getVertices()
    .filter((vertex) => !vertex.isHidden())
    .map((vertex) => {
      const n = {id: vertex.id, radius: vertex.radius, fixed: vertex.fixed} as any
      if (maintainFixed && vertex.fixed) {
        n.fx = vertex.position.x;
        n.fy = vertex.position.y;
      }
      return n
    })
  const links = layout.getEdges().map((edge) => {
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

  nodes.forEach((node) => {
    if (!maintainFixed || !node.fixed) {
      const vertex = layout.vertices.get(node.id) as Vertex
      const position = new Point(node.x, node.y)
      layout.vertices.set(vertex.id, vertex.snapPosition(position))
    }
  });

  return layout;
}

export default forceLayout;
