import {forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation} from "d3-force";
import {Vertex} from "../Vertex";
import {Point} from "../Point";
import {GraphLayout} from "../GraphLayout";

export function forceLayout(layout:GraphLayout):GraphLayout{
  const nodes = layout.getVertices()
    .filter((vertex) => !vertex.hidden);

  const links = layout.getEdges().map((edge) => {
    return {
      source: nodes.find((n) => n.id === edge.sourceId),
      target: nodes.find((n) => n.id === edge.targetId)
    }
  }).filter((link) => (link.source && link.target))

  const simulation = forceSimulation(nodes)
    .force('links', forceLink(links))
    .force("manyBody", forceManyBody().strength(10))
    // .force('collide', forceCollide(layout.config.DEFAULT_VERTEX_RADIUS).strength(2))
    .force("center", forceCenter());
  simulation.stop()
  simulation.tick(500)

  nodes.forEach((node) => {
    const vertex = layout.vertices.get(node.id) as Vertex
    const position = new Point(node.x, node.y)
    layout.vertices.set(vertex.id, vertex.snapPosition(position))
  })

  return layout;
}
