import { Point, Vertex } from "../";

const STEP = 4;

const alignHorizontal = ({ vertices }: { vertices: Array<Vertex> }): any => {
  const averageY = vertices.map(v => v.position.y)
      .reduce((_r, p)=> _r + p, 0)
    / vertices.length;

  const leftVertex = Math.min(...vertices.map(v => v.position.x))

  return (v, i) => new Point(leftVertex + (i * STEP), averageY);
}

export default alignHorizontal;
