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

  matchForward(source: Vertex, target: Vertex): boolean {
    const sourceEntity = source.getEntity()
    const targetEntity = target.getEntity()
    if (!sourceEntity) {
      return false
    }
    if (this.property && sourceEntity.hasProperty(this.property)) {
      if (target.type === this.property.type.name) {
        const targetEntity = target.getEntity()
        if (!targetEntity) {
          return true
        }
        return targetEntity.schema.isA(this.property.getRange())
      }

    }
    if (this.schema && this.schema.edge && targetEntity) {
      const sourceProperty = this.schema.getProperty(this.schema.edge.source)
      const targetProperty = this.schema.getProperty(this.schema.edge.target)
      if (sourceEntity.schema.isA(sourceProperty.getRange())) {
        if (targetEntity.schema.isA(targetProperty.getRange())) {
          return true
        }
      }
    }
    return false
  }

  matchBackward(source: Vertex, target: Vertex): boolean {
    return this.matchForward(target, source)
  }

  match(source: Vertex, target: Vertex): boolean {
    return this.matchForward(source, target) || this.matchBackward(source, target)
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

  static getMatching(model: Model, source: Vertex, target: Vertex): EdgeType[] {
    return EdgeType.getAll(model).filter((et) => et.match(source, target))
  }
}
