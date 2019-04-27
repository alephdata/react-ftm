import { Entity, Property, PropertyType, Value } from '@alephdata/followthemoney';

import { Point, IPointData } from './Point'
import { GraphLayout } from './GraphLayout'
import { getPositionByIndex } from './utils'

interface IVertexData {
  id: string
  type: string
  label: string
  point?: IPointData
  entityId?: string
}

export class Vertex {
  public readonly layout: GraphLayout
  public readonly id: string
  public readonly type: string
  public readonly label: string
  public position: Point
  public readonly entityId?: string

  constructor(layout: GraphLayout, data: IVertexData) {
    this.layout = layout
    this.type = data.type
    this.label = data.label
    this.id = data.id
    this.position = data.point ? Point.fromJSON(data.point) : new Point()
    this.entityId = data.entityId
  }

  onAddedToGraph(){
    this.position = getPositionByIndex(this.layout.vertices.size - 1);
  }

  clone(): Vertex {
    return Vertex.fromJSON(this.layout, this.toJSON())
  }

  setPosition(position: Point): Vertex {
    const vertex = this.clone()
    vertex.position = position
    return vertex
  }

  toJSON(): IVertexData {
    return {
      id: this.id,
      type: this.type,
      label: this.label,
      point: this.position.toJSON(),
      entityId: this.entityId
    }
  }

  static fromJSON(layout: GraphLayout, data: any): Vertex {
    return new Vertex(layout, data as IVertexData)
  }

  static fromEntity(layout: GraphLayout, entity: Entity): Vertex {
    const type = PropertyType.ENTITY;
    if (entity.schema.isEdge) {
      throw new Error("Cannot make vertex from edge entity.")
    }
    return new Vertex(layout, {
      id: `${type}:${entity.id}`,
      type: type,
      label: entity.getCaption() || entity.schema.label,
      entityId: entity.id
    });
  }

  static fromValue(layout: GraphLayout, property: Property, value: Value): Vertex {
    if (property.type.name === PropertyType.ENTITY || value instanceof Entity) {
      if (value instanceof Entity) {
        return Vertex.fromEntity(layout, value);
      }
      const entity = layout.entities.get(value)
      if (!entity) {
        throw new Error("Dangling entity reference.")
      }
      return Vertex.fromEntity(layout, entity);
    }
    const type = property.type.name;
    return new Vertex(layout, {
      id: `${type}:${value}`,
      type: type,
      label: value
    });
  }
}
