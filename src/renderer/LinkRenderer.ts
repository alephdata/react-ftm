import { ICollectionRenderer } from './Renderer'
import { BaseType, Selection } from 'd3-selection'
import { CommonCollection, Edge } from '../core'
import * as d3 from 'd3'

export class LinkRenderer implements ICollectionRenderer<Edge> {
  private parent: Selection<SVGGElement, any, HTMLElement | null, undefined>
  public container: Selection<SVGGElement, Edge, BaseType, any>

  constructor(parent: Selection<SVGGElement, any, HTMLElement | null, undefined>) {
    this.parent = parent
    this.container = this.parent
      .append('g')
      .attr('stroke', '#000')
      .attr('stroke-width', 1.5)
      .selectAll('.link')
  }

  render(links: CommonCollection<Edge>) {
    this.container = this.container.data(links.toArray())
    this.container.exit().remove()
    this.container = this.container
      .enter()
      .append('g')
      .each(function(edge) {
        edge.render(d3.select(this))
      })
      .merge(this.container)
  }

  updatePositions() {
    this.container.each(function(vertex) {
      vertex.position(d3.select(this))
    })
  }
}
