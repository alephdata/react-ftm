import { Edge, Point, Rectangle, Vertex } from "../";

const alignCircle = ({vertices, center, radius}:{ vertices: Array<Vertex>, center?: Point, radius?: number }): any => {
  const radius = radius || vertices.length;
  const center = center || Rectangle.fromPoints(
    ...vertices.map(v => v.position)
  ).getCenter();
  const step = (2*Math.PI) / vertices.length;

  return (v, i) => {
    const angle = step * i;
    return new Point(
      Math.round(center.x + radius * Math.cos(angle)),
      Math.round(center.y + radius * Math.sin(angle))
    )))
  };
}

export default alignCircle;
