import { Vertex } from './Vertex'
import { Entity, PropertyType, Property, Value } from '@alephdata/followthemoney';
import { Graph } from './Graph';

interface IEdgeData {
  id: string
  type: string
  label: string
  sourceId: string
  targetId: string
  entityId?: string
  propertyQName?: string
}

export class Edge {
  private readonly graph: Graph
  public readonly id: string
  public readonly type: string
  public readonly label: string
  public readonly sourceId: string
  public readonly targetId: string
  public readonly entityId?: string
  public readonly propertyQName?: string

  constructor(graph: Graph, data: IEdgeData) {
    this.graph = graph
    this.id = data.id
    this.type = data.type
    this.label = data.label
    this.sourceId = data.sourceId
    this.targetId = data.targetId
    this.entityId = data.entityId
    this.propertyQName = data.propertyQName
  }

  clone(): Edge {
    return Edge.fromJSON(this.graph, this.toJSON())
  }

  toJSON(): IEdgeData {
    return {
      id: this.id,
      type: this.type,
      label: this.label,
      sourceId: this.sourceId,
      targetId: this.targetId,
      entityId: this.entityId,
      propertyQName: this.propertyQName
    }
  }

  static fromJSON(graph: Graph, data: any): Edge {
    return new Edge(graph, data as IEdgeData)
  }

  static fromEntity(graph: Graph, entity: Entity, source: Vertex, target: Vertex): Edge {
    return new Edge(graph, {
      id: `${entity.id}(${source.id}, ${target.id})`,
      type: PropertyType.ENTITY,
      label: entity.getCaption() || entity.schema.label,
      sourceId: source.id,
      targetId: target.id,
      entityId: entity.id
    })
  }

  static fromValue(graph: Graph, property: Property, source: Vertex, target: Vertex) {
    if (!source.entityId) {
      throw new Error('No source entity for value edge.')
    }
    return new Edge(graph, {
      id: `${source.entityId}:${property.qname}(${target.id})`,
      type: property.type.name,
      label: property.label,
      sourceId: source.id,
      targetId: target.id,
      entityId: source.entityId,
      propertyQName: property.qname
    })
  }

}
