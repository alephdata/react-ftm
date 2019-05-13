import { Model, Schema, Property, IconRegistry, PropertyType } from '@alephdata/followthemoney'
import { GraphContext, IGraphContext } from '../GraphContext'
import { Vertex } from '../layout/Vertex'


export class EdgeType {
  public schema?: Schema
  public property?: Property
  public label: string
  public key: string

  constructor(schema?: Schema, property?: Property) {
    this.schema = schema
    this.property = property
    this.label = ((schema && schema.label) || (property && property.label)) as string
    this.key = ((schema && schema.name) || (property && property.qname)) as string
  }

  match(first: Vertex, second?: Vertex): boolean {
    const firstEntity = first.getEntity()
    const secondEntity = second ? second.getEntity() : undefined
    if (this.property) {
      return true
    } else if (this.schema && this.schema.edge && (firstEntity || secondEntity)) {
      const sourceProperty = this.schema.getProperty(this.schema.edge.source)
      const targetProperty = this.schema.getProperty(this.schema.edge.target)
      return true
    }
    return false
  }

  static getAll(model: Model): EdgeType[] {
    const types = new Array<EdgeType>()
    model.getSchemata().forEach((schema) => {
      types.push(new EdgeType(schema))
    })
    model.getProperties().forEach((prop) => {
      if (prop.type.grouped && !prop.stub) {
        types.push(new EdgeType(undefined, prop))
      }
    })
    return types.sort((a, b) => a.label.localeCompare(b.label))
  }

  static getMatching(model: Model, vertices: Vertex[]): EdgeType[] {
    if (vertices.length === 0 || vertices.length > 2) {
      return []
    }
    const first = vertices[0]
    const second = vertices.length > 1 ? vertices[1] : undefined
    return EdgeType.getAll(model).filter((et) => et.match(first, second))
  }
}
