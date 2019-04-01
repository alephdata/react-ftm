export class Vertex {
  type: string
  label: string
  id: string

  constructor(type: string, label: string, id: string) {
    this.type = type
    this.label = label
    this.id = id
    this.equals = this.equals.bind(this)
  }

  equals(vertex: Vertex): boolean {
    return this.id === vertex.id
  }
}
