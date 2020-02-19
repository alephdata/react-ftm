import {forceCollide, forceLink, forceSimulation} from "d3-force";
import {Vertex} from "../Vertex";
import {Point} from "../Point";
import {GraphLayout} from "../GraphLayout";

export function forceLayout(layout:GraphLayout):GraphLayout{
  const nodes = layout.getVertices()
    .filter((vertex) => !vertex.hidden)
    .map((vertex) => {
      const n = {id: vertex.id, fixed: vertex.fixed} as any
      if (vertex.fixed) {
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
    .force('links', forceLink(links))
    .force('collide', forceCollide(layout.config.DEFAULT_VERTEX_RADIUS).strength(2))
  simulation.stop()
  simulation.tick(500)
  nodes.forEach((node) => {
    if (!node.fixed) {
      const vertex = layout.vertices.get(node.id) as Vertex
      const position = new Point(node.x, node.y)
      layout.vertices.set(vertex.id, vertex.snapPosition(position))
    }
  })

  return layout;
}
