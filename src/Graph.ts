import { Entity } from '@alephdata/followthemoney'
import { Vertex } from './Vertex'
import { Edge } from './Edge'

export class Graph {
  vertices: Array<Vertex> = []
  edges: Array<Edge> = []
  entities: Array<Entity> = []
  addEntity(entity: Entity): void {
    // TODO: IMPLEMENT!!!!
    console.log(entity, this)
  }
}
