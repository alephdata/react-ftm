import { Vertex } from '../core/Vertex'
import { Entity } from '../followthemoney'
import { BaseType, Selection } from 'd3-selection'
import * as d3 from 'd3'

type EntityVertexElement = Selection<SVGGElement, EntityVertex, BaseType, any>

export class EntityVertex extends Vertex {
  static getColor = d3.scaleOrdinal(d3.schemeDark2)
  entity: Entity

  constructor(entity: Entity) {
    super()
    this.entity = entity
  }

  getIdentification(): string {
    return this.entity.id
  }

  getLabel() {
    return this.entity.schema.getLabel({ forcePlural: true })
  }

  render(parent: EntityVertexElement) {
    const { getColor } = EntityVertex
    parent.append('title').text(this.entity.getProperty('name').toString())
    parent
      .append('circle')
      .attr('fill', getColor(this.getLabel()))
      .attr('r', 15)

    parent
      .append('g')
      .attr('transform', 'translate(-45,32)')
      .attr('stroke', '#000')
      .attr('fill', '#Fff')
      .append('text')
      .append('tspan')
      .text(this.entity.getProperty('name').toString())
  }

  position(parent: EntityVertexElement) {
    parent.attr('transform', `translate(${this.x},${this.y})`)
  }
}
