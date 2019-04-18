import { Entity } from '@alephdata/followthemoney'
import { Edge } from './Edge'
import { Vertex } from './Vertex'

export class EntityEdge extends Edge {
  constructor(edge: Entity, source: Vertex, target: Vertex) {
    super(source, target, edge.id + source.id + target.id)
  }
}
