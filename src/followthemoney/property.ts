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
  hidden: boolean
  reverse?: string
}

export class Property {
  public readonly name: string
  public readonly label: string
  public readonly type: string
  public readonly caption: boolean
  public readonly value?: PropertyValue
  public readonly hidden: boolean
  private qname: string
  private description: string | null
  private stub: boolean
  private uri: string
  private reverse?: string
  constructor(property: IPropertyDatum) {
    this.name = property.name
    this.label = property.label
    this.type = property.type
    this.caption = property.caption
    this.hidden = property.hidden
    this.qname = property.qname
    this.description = property.description
    this.stub = property.stub
    this.uri = property.uri
    this.reverse = property.reverse
  }
}
