import { Edge, Grouping, Point, Vertex } from "../";

export interface IPositioningProps {
  vertices: Array<Vertex>,
  edges: Array<Edge>,
  groupings: Array<Grouping>,
  options?: any
}
