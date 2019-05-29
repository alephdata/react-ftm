import {GraphLayout} from "../GraphLayout";
import {Point} from "../Point";
import {forceCollide, forceRadial, forceSimulation} from "d3-force";
import {Vertex} from "../Vertex";
import {Rectangle} from "../Rectangle";

export function alignCircle(layout:GraphLayout):GraphLayout{
  const vertices = layout.getSelectedVertices().filter(v=>!v.isHidden())
  const radius = vertices.length;
  // const center = 0;
  const center = Rectangle.fromPoints(
    ...vertices.map(v => v.position)
  ).getCenter()
  const step = (2*Math.PI) / radius;
  vertices.forEach(function(v,i) {
    const angle = step * i;
    layout.vertices.set(v.id, v.snapPosition(new Point(
      Math.round(center.x + radius * Math.cos(angle) - layout.config.VERTEX_RADIUS),
      Math.round(center.y + radius * Math.sin(angle) - layout.config.VERTEX_RADIUS)
    )))

  })
  return layout
}
//
// export function alignCircle(layout:GraphLayout, step = 1):GraphLayout{
//   const nodes = layout.getSelectedVertices()
//     .filter(v => !v.isHidden())
//     .map((vertex) => {
//       return {id: vertex.id} as any
//     })
//
//   console.log(nodes.length, nodes)
//   const simulation = forceSimulation(nodes)
//     .force('radial', forceRadial(((nodes.length * step) / 2)   ).strength(3))
//     .force('collide', forceCollide(layout.config.VERTEX_RADIUS).strength(4))
//   simulation.stop()
//   simulation.tick(500)
//   nodes.forEach((node) => {
//     if (!node.fixed) {
//       const vertex = layout.vertices.get(node.id) as Vertex
//       const position = new Point(node.x, node.y)
//       layout.vertices.set(vertex.id, vertex.snapPosition(position))
//     }
//   })
//   return layout;
// }
