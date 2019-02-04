import { ICollectionRenderer } from './Renderer'
import { BaseType, Selection } from 'd3-selection'
import CommonCollection, { CommonCollectionStorage } from '../core/CommonCollection'
import * as d3 from 'd3'
import { Edge } from '../core'

export class LinkRenderer implements ICollectionRenderer<Edge> {
  private parent: Selection<SVGGElement, any, HTMLElement | null, undefined>
  public container: Selection<SVGLineElement, any, BaseType, any>

  constructor(parent: Selection<SVGGElement, any, HTMLElement | null, undefined>) {
    this.parent = parent
    this.container = this.parent
      .append('g')
      .attr('stroke', '#000')
      .attr('stroke-width', 1.5)
      .selectAll('.link')
  }

  getColor = d3.scaleOrdinal(d3.schemeCategory10)

  render(links: CommonCollectionStorage<Edge>) {
    const { getColor } = this

    // Apply the general update pattern to the links.
    this.container = this.container.data(Array.from(links.values()))
    this.container.exit().remove()
    this.container = this.container
      .enter()
      .append('line')
      .attr('stroke', function(d) {
        return getColor(d.entity.schema.name)
      })
      .merge(this.container)
  }

  updatePositions() {
    this.container
      .attr('x1', function(d) {
        return d.source.x
      })
      .attr('y1', function(d) {
        return d.source.y
      })
      .attr('x2', function(d) {
        return d.target.x
      })
      .attr('y2', function(d) {
        return d.target.y
      })
  }
}
