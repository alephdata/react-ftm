import { ICollectionRenderer } from './Renderer'
import { Vertex, CommonCollection } from '../core'
import { BaseType, Selection } from 'd3-selection'
import * as d3 from 'd3'

export class NodeRenderer implements ICollectionRenderer<Vertex> {
  private parent: Selection<SVGGElement, any, HTMLElement | null, undefined>
  public container: Selection<SVGGElement, Vertex, BaseType, any>

  constructor(parent: Selection<SVGGElement, any, HTMLElement | null, undefined>) {
    this.parent = parent
    this.container = this.parent
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('.node')
  }

  render(nodes: CommonCollection<Vertex>) {
    this.container = this.container.data(nodes.toArray())

    this.container.exit().remove()
    this.container = this.container
      .enter()
      .append('g')
      .each(function(vertex) {
        vertex.render(d3.select(this))
      })
      .merge(this.container)
  }

  updatePositions() {
    this.container.each(function(vertex) {
      vertex.position(d3.select(this))
    })
  }
}
