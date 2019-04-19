import { Point } from './Point'
import { Graph } from './Graph'
import { getPositionByIndex } from './utils'

export class Vertex {
  public point = new Point();
  public graph?: Graph
  public id: string
  public type: string
  public label: string

  constructor(type: string, label: string, id: string) {
    this.type = type
    this.label = label
    this.id = id
  }

  onAddedToGraph(graph: Graph){
    this.graph = graph;
    this.point = getPositionByIndex(graph.vertices.size - 1);
  }
}
