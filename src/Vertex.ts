import { Entity, Property, PropertyType, Value } from '@alephdata/followthemoney';

import { Point, IPointData } from './Point'
import { Graph } from './Graph'
import { getPositionByIndex } from './utils'

interface IVertexData {
  id: string
  type: string
  label: string
  point?: IPointData
  entityId?: string
}

export class Vertex {
  public readonly graph: Graph
  public readonly id: string
  public readonly type: string
  public readonly label: string
  public point: Point
  public readonly entityId?: string

  constructor(graph: Graph, data: IVertexData) {
    this.graph = graph
    this.type = data.type
    this.label = data.label
    this.id = data.id
    this.point = data.point ? Point.fromJSON(data.point) : new Point()
    this.entityId = data.entityId
  }

  onAddedToGraph(){
    this.point = getPositionByIndex(this.graph.vertices.size - 1);
  }

  toJSON(): IVertexData {
    return {
      id: this.id,
      type: this.type,
      label: this.label,
      point: this.point.toJSON(),
      entityId: this.entityId
    }
  }

  static fromJSON(graph: Graph, data: any): Vertex {
    return new Vertex(graph, data as IVertexData)
  }

  static fromEntity(graph: Graph, entity: Entity): Vertex {
    const type = PropertyType.ENTITY;
    if (entity.schema.isEdge) {
      throw new Error("Cannot make vertex from edge entity.")
    }
    return new Vertex(graph, {
      id: `${type}:${entity.id}`,
      type: type,
      label: entity.getCaption() || entity.schema.label,
      entityId: entity.id
    });
  }

  static fromValue(graph: Graph, property: Property, value: Value): Vertex {
    if (property.type.name === PropertyType.ENTITY || value instanceof Entity) {
      if (value instanceof Entity) {
        return Vertex.fromEntity(graph, value);
      }
      const entity = graph.entities.get(value)
      if (!entity) {
        throw new Error("Dangling entity reference.")
      }
      return Vertex.fromEntity(graph, entity);
    }
    const type = property.type.name;
    return new Vertex(graph, {
      id: `${type}:${value}`,
      type: type,
      label: value
    });
  }
}
