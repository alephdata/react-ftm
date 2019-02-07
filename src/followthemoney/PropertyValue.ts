import { Property } from './property'

export class PropertyValue {
  name: string
  value: Array<any>
  property: Property
  constructor(name: string, value: Array<any>, property: Property) {
    this.name = name
    this.value = value
    this.property = property
  }
  toString(separator: string = ' ') {
    return this.value.join(separator)
  }
}
