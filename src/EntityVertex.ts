import { Vertex } from './Vertex'
import { Entity, PropertyType } from '@alephdata/followthemoney'

export class EntityVertex extends Vertex {
  public entity: Entity

  constructor(entity: Entity) {
    const label = entity.getCaption() || entity.id;
    super(PropertyType.ENTITY, label, entity.id)
    this.entity = entity
  }
}
