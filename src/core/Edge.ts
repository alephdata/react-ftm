import { Vertex } from './Vertex'
import { BaseType, Selection } from 'd3-selection'

export interface ILinkDatum {
  source: Vertex
  target: Vertex

  getIdentification(): any
}

export interface IEdgeConfiguration {
  source: Vertex
  target: Vertex
}

/*
 * @description Holds Target and Source Vertices and responsible for rendering and positioning Edges on canvas
 * */
export class Edge implements ILinkDatum {
  public source: Vertex
  public target: Vertex
  public index: number = 0

  constructor(configuration: IEdgeConfiguration) {
    this.source = configuration.source
    this.target = configuration.target
  }

  getIdentification() {
    return this.index
  }

  render(parent: Selection<SVGGElement, any, BaseType, any>) {
    parent.append('line').classed('line', true)
  }

  position(self: Selection<SVGGElement, any, BaseType, any>) {
    self
      .select('.line')
      .attr('x1', this.source.x)
      .attr('y1', this.source.y)
      .attr('x2', this.target.x)
      .attr('y2', this.target.y)
  }

  value: any
}
