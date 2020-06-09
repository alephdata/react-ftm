import {forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation} from "d3-force";
import {Vertex} from "../Vertex";
import {Point} from "../Point";
import {GraphLayout} from "../GraphLayout";

const generateNodes = (layout: GraphLayout) => {
  return layout.getVertices()
    .filter((vertex) => !vertex.isHidden())
    .map((vertex) => {
      const n = {id: vertex.id, radius: vertex.radius, fixed: vertex.fixed} as any
      if (vertex.fixed) {
        n.fx = vertex.position.x;
        n.fy = vertex.position.y;
      }
      return n
    })
}

const generateLinks = (layout: GraphLayout) => {
  return layout.getEdges()
    .map((edge) => {
      return {
        source: nodes.find((n) => n.id === edge.sourceId),
        target: nodes.find((n) => n.id === edge.targetId)
      }
    })
    .filter((link) => (link.source && link.target))
}

function applyForces(layout:GraphLayout, fi): GraphLayout {
  const nodes = generateNodes(layout);
  const links = generateLinks(layout);

  const simulation = forceSimulation(nodes)
    .force('links', forceLink(links).distance(3))
    .force('collide', forceCollide().radius(n => n.radius).iterations(50))
    .tick(50)
    .stop();

  nodes.forEach((node) => {
    if (!node.fixed) {
      const vertex = layout.vertices.get(node.id) as Vertex
      const position = new Point(node.x, node.y);
      layout.vertices.set(vertex.id, vertex.setPosition(position))
    }
  })

  return layout;
}

export default applyForces;
