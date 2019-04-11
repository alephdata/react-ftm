import { Point } from './Point'
import { Graph } from './Graph'
import { getPositionByIndex } from './utils'

export class Vertex{
  public point = new Point();
  public graph?: Graph
  public id: string
  type: string
  label: string

  constructor( type: string, label: string, id: string) {
    this.type = type
    this.label = label
    this.id = id
    this.equals = this.equals.bind(this)
  }
  onAddedToGraph(graph:Graph){
    this.graph = graph;
    this.point.set(getPositionByIndex(graph.vertices.size - 1));
  }
  equals(vertex: Vertex): boolean {
    return this.id === vertex.id
  }
}
