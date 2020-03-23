import {GraphLayout} from "../GraphLayout";
import {Point} from "../Point";
import {Rectangle} from "../Rectangle";

export function alignCircle(layout:GraphLayout):GraphLayout{
  const vertices = layout.getSelectedVertices().filter(v=>!v.isHidden())
  const adjacentEdges = layout.getSelectionAdjacentEdges()

  const radius = vertices.length;
  // const center = 0;
  const center = Rectangle.fromPoints(
    ...vertices.map(v => v.position)
  ).getCenter()
  const step = (2*Math.PI) / radius;
  vertices.forEach(function(v,i) {
    const angle = step * i;
    layout.vertices.set(v.id, v.snapPosition(new Point(
      Math.round(center.x + radius * Math.cos(angle) - layout.config.DEFAULT_VERTEX_RADIUS),
      Math.round(center.y + radius * Math.sin(angle) - layout.config.DEFAULT_VERTEX_RADIUS)
    )))
  })
  adjacentEdges.forEach((edge) => {
    layout.edges.set(edge.id, edge.setLabelPosition(undefined))
  })
  return layout
}
