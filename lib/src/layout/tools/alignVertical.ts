import {GraphLayout} from "../GraphLayout";
import {Point} from "../Point";

export function alignVertical(layout:GraphLayout, step = 4): GraphLayout{
  const selectedVertices = layout.getSelectedVertices();
  const averageY =  selectedVertices
      .reduce((_r, v)=> _r + v.position.x, 0)
    / selectedVertices.length

  const leftVertex = Math.min(...selectedVertices.map(v => v.position.y))

  selectedVertices
    .forEach((v, i) =>  layout.vertices.set(v.id, v.snapPosition(new Point(averageY, leftVertex + (i * step)))))
  layout.history.push(layout.toJSON())

  return layout
}
