import {forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation} from "d3-force";
import {Vertex} from "../Vertex";
import {Point} from "../Point";
import {GraphLayout} from "../GraphLayout";

function collide(node) {
  var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  };
}

function disperse(layout:GraphLayout): GraphLayout {
  const nodes = layout.getVertices().filter(v => !v.isHidden())
    .map(v => {
      const { position, fixed, label, color, ...rest} = v.toJSON();

      return {
        x: position.x,
        y: position.y,
        ...rest,
      };
    });

  const links = layout.getEdges().map((edge) => {
    return {
      source: nodes.find((n) => n.id === edge.sourceId),
      target: nodes.find((n) => n.id === edge.targetId)
    }
  }).filter((link) => (link.source && link.target))
  const simulation = forceSimulation(nodes)
    .force('collide', forceCollide().radius(n => n.radius).iterations(50))
    .tick(5)
    .stop();

  nodes.forEach((node) => {
    const vertex = layout.vertices.get(node.id) as Vertex
    const position = new Point(node.x, node.y);
    layout.vertices.set(vertex.id, vertex.setPosition(position))
  })

  return layout;
}

export default disperse;
