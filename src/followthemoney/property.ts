import { TypeCommon } from './types/TypeCommon'
import { PropertyValue } from './PropertyValue'

export interface IPropertyDatum {
  name: string
  qname: string
  label: string
  description: string | null
  caption: boolean
  stub: boolean
  uri: string
  type: string
  schema?: string
  reverse?: string
}

export class Property {
  public readonly name: string
  public readonly label: string
  public readonly type: string
  public readonly caption: boolean
  public readonly value?: PropertyValue
  constructor(property: IPropertyDatum) {
    this.name = property.name
    this.label = property.label
    this.type = property.label
    this.caption = property.caption
  }
}
