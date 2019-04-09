import { Edge } from './Edge'
import { EntityVertex } from './EntityVertex'
import { ValueVertex } from './ValueVertex'

export class PropertyEdge extends Edge {
  constructor(source: EntityVertex, target: ValueVertex) {
    super(source, target, source.entity.id + source.id)
  }
}
