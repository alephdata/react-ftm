import { Entity } from '@alephdata/followthemoney'
import { Edge } from './Edge'
import { Vertex } from './Vertex'

export class EntityEdge extends Edge {
  constructor(interval: Entity, source: Vertex, target: Vertex) {
    super(source, target, interval.id + source.id + target.id)
  }
}
