import {GraphLayout} from "../GraphLayout";
import {Point} from "../Point";

export function alignHorizontal(layout:GraphLayout, step = 4): GraphLayout{
  const selectedVertices = layout.getSelectedVertices();
  const averageY =  selectedVertices.map(v => v.position.y)
      .reduce((_r, p)=> _r + p, 0)
    / selectedVertices.length

  const leftVertex = Math.min(...selectedVertices.map(v => v.position.x))

  selectedVertices
    .forEach((v, i) =>  layout.vertices.set(v.id, v.snapPosition(new Point(leftVertex + (i * step), averageY))))
  layout.history.push(layout.toJSON())

  return layout
}
