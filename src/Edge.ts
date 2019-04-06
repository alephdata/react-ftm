import { Vertex } from './Vertex'

export class Edge {
  source: Vertex
  target: Vertex
  id: string
  constructor(source: Vertex, target: Vertex, id: string) {
    this.id = id
    this.source = source
    this.target = target

    this.equals = this.equals.bind(this)
  }
  equals(vertex: Edge): boolean {
    return this.id === vertex.id
  }
}
