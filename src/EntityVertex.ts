import { Vertex } from './Vertex'
import { Entity } from '@alephdata/followthemoney'

export class EntityVertex extends Vertex {
  public entity: Entity
  constructor(entity: Entity) {
    super('entity', entity.getProperty('name').toString(), entity.id)
    this.entity = entity
  }
}
