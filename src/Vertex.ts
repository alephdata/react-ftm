import { Point } from './Point'
import { Graph } from './Graph'
import { getPositionByIndex } from './utils'

export class Vertex {
  public point = new Point();
  public graph?: Graph
  type: string
  label: string
  id: string

  constructor( type: string, label: string, id: string) {
    this.type = type
    this.label = label
    this.id = id
    this.equals = this.equals.bind(this)
  }
  onAddedToGraph(graph:Graph){
    this.graph = graph;
    this.point.set(getPositionByIndex(graph.storage.get('vertices').size));
  }
  equals(vertex: Vertex): boolean {
    return this.id === vertex.id
  }
}
