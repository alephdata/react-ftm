import { Vertex } from './Vertex'

export class Edge {
  public id: string
  source: Vertex
  target: Vertex

  constructor(source: Vertex, target: Vertex, id: string) {
    this.id = id
    this.source = source
    this.target = target
  }
}
