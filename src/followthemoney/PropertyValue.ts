import { Property } from './property'

export class PropertyValue {
  name: string
  value: any
  property: Property
  constructor(name: string, value: any, property: Property) {
    this.name = name
    this.value = value[0]
    this.property = property
  }
}
