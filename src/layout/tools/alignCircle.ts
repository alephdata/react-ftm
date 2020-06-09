import { Edge, Point, Rectangle, Vertex } from "../";

const alignCircle = ({vertices, center, radius}:{ vertices: Array<Vertex>, center?: Point, radius?: number }): any => {
  const circleRadius = radius || vertices.length;
  const circleCenter = center || Rectangle.fromPoints(
    ...vertices.map(v => v.position)
  ).getCenter();
  const step = (2*Math.PI) / vertices.length;

  return (v:Vertex, i:number) => {
    const angle = step * i;
    return new Point(
      Math.round(circleCenter.x + circleRadius * Math.cos(angle)),
      Math.round(circleCenter.y + circleRadius * Math.sin(angle))
    );
  };
}

export default alignCircle;
