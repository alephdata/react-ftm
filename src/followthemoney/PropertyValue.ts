import { Property } from './property'

export class PropertyValue {
  name: string
  values: Array<any>
  property: Property
  constructor(name: string, values: Array<any>, property: Property) {
    this.name = name
    this.values = values
    this.property = property
  }
  toString(separator: string = ' ') {
    return this.values.join(separator)
  }
  isEmpty(): boolean {
    return !this.values.length
  }
}
