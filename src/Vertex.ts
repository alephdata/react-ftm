import { Entity, Property, PropertyType, Value } from '@alephdata/followthemoney';
import { Point, IPointData } from './Point'
import { GraphLayout } from './GraphLayout'
import { getPositionByIndex } from './utils'

interface IVertexData {
  id: string
  type: string
  label: string
  fixed: boolean
  hidden: boolean
  point?: IPointData
  entityId?: string
}

export class Vertex {
  static RADIUS = 1;

  public readonly layout: GraphLayout
  public readonly id: string
  public readonly type: string
  public readonly label: string
  public fixed: boolean
  public hidden: boolean
  public position: Point
  public readonly entityId?: string

  constructor(layout: GraphLayout, data: IVertexData) {
    this.layout = layout
    this.id = data.id
    this.type = data.type
    this.label = data.label
    this.fixed = data.fixed
    this.hidden = data.hidden
    this.position = data.point ? Point.fromJSON(data.point) : new Point()
    this.entityId = data.entityId
  }

  getDegree(): number {
    return Array.from(this.layout.edges.values())
      .filter((edge) => edge.sourceId == this.id || edge.targetId == this.id)
      .length;
  }

  clone(): Vertex {
    return Vertex.fromJSON(this.layout, this.toJSON())
  }

  setPosition(position: Point): Vertex {
    const vertex = this.clone()
    vertex.position = position
    vertex.fixed = true
    return vertex
  }

  toJSON(): IVertexData {
    return {
      id: this.id,
      type: this.type,
      label: this.label,
      fixed: this.fixed,
      hidden: this.hidden,
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
      fixed: false,
      hidden: false,
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
      label: value,
      fixed: false,
      hidden: false
    });
  }
}
