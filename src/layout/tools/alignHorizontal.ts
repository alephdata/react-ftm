import { Point, Vertex } from "../";

const STEP = 4;

const alignHorizontal = ({ vertices }: { vertices: Array<Vertex> }): any => {
  const averageY = vertices.map(v => v.position.y)
      .reduce((_r, p)=> _r + p, 0)
    / vertices.length;

  const leftVertex = Math.min(...vertices.map(v => v.position.x))

  return (v:Vertex, i:number) => new Point(leftVertex + (i * STEP), averageY);
}

export default alignHorizontal;
