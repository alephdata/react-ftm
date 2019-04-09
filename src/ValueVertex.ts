import { Vertex } from './Vertex'
import { Entity, Property, Value } from '@alephdata/followthemoney'

export class ValueVertex extends Vertex {
  public property: Property
  public entity: Entity
  public value: Value
  constructor(entity: Entity, property: Property, value: Value) {
    if (!property.type.group) {
      throw new Error('property must have a `type.group` to be represented as a Vertex.')
    }
    super(property.type.group, value.toString(), entity.id + property.name + value.toString())
    this.entity = entity
    this.property = property
    this.value = value
  }
}
