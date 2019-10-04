import { Vertex } from './Vertex'
import { Entity, PropertyType, Property, Value } from '@alephdata/followthemoney';
import { GraphLayout } from './GraphLayout';
import { Rectangle } from './Rectangle';
import { Point } from './Point';


interface IGroupingData {
  id: string
  label: string
  color: string
  vertices: Array<any>
}

export class Grouping {
  private readonly layout: GraphLayout
  public readonly id: string
  public readonly label: string
  public color: string
  public readonly vertices: Array<any>

  constructor(layout: GraphLayout, data: IGroupingData) {
    this.layout = layout
    this.id = data.id
    this.label = data.label
    this.color = data.color
    this.vertices = data.vertices
  }

  clone(): Grouping {
    return Grouping.fromJSON(this.layout, this.toJSON())
  }

  toJSON(): IGroupingData {
    return {
      id: this.id,
      label: this.label,
      color: this.color,
      vertices: this.vertices,
    }
  }

  static fromJSON(layout: GraphLayout, data: any): Grouping {
    return new Grouping(layout, data as IGroupingData)
  }

  static fromVertices(layout: GraphLayout, label: string, vertices: Vertex[], color?: string): Grouping {
    return new Grouping(layout, {
      id: `${vertices.map(v => v.id)}`,
      label: label,
      color: color || layout.config.DEFAULT_VERTEX_COLOR,
      vertices: vertices.map(v => v.id)
    })
  }
}
