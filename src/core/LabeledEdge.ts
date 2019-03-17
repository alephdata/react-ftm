import { Edge, IEdgeConfiguration } from './Edge'
import { Selection, BaseType } from 'd3-selection'

interface ILabeledEdgeConfiguration extends IEdgeConfiguration {
  label: string
}
export class LabeledEdge extends Edge {
  private label: string
  constructor(configuration: ILabeledEdgeConfiguration) {
    super(configuration)
    this.label = configuration.label
  }
  render(parent: Selection<SVGGElement, any, BaseType, any>) {
    super.render(parent)
    parent
      .append('text')
      .classed('link-text', true)
      .text(this.label)
  }
  position(self: Selection<SVGGElement, any, BaseType, any>) {
    super.position(self)
    self
      .select('.link-text')
      .attr('x', (this.source.x + this.target.x) / 2)
      .attr('y', (this.source.y + this.target.y) / 2)
  }
}
