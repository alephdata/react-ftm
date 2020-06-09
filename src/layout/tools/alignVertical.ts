import { Point, Vertex } from "../";

const STEP = 4;

const alignVertical = ({ vertices }: { vertices: Array<Vertex> }): any => {
  const averageX = vertices
      .reduce((_r, v)=> _r + v.position.x, 0)
    / vertices.length

  const topVertex = Math.min(...vertices.map(v => v.position.y))

  return (v:Vertex, i:number) => new Point(averageX, topVertex + (i * STEP))
}

export default alignVertical;
