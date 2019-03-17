import { BaseType, Selection } from 'd3-selection'

export interface IVertex {
  /**
   * Vertex’s zero-based index into nodes array. This property is set during the initialization process of a simulation.
   */
  index?: number
  /**
   * Vertex’s current x-position
   */
  x?: number
  /**
   * Vertex’s current y-position
   */
  y?: number
  /**
   * Vertex’s current x-velocity
   */
  vx?: number
  /**
   * Vertex’s current y-velocity
   */
  vy?: number
  /**
   * Vertex’s fixed x-position (if position was fixed)
   */
  fx?: number | null
  /**
   * Vertex’s fixed y-position (if position was fixed)
   */
  fy?: number | null

  getIdentification(): any
}

/*
 * Responsible for holding Vertex coordinates
 * */
export class Vertex implements IVertex {
  public x: number = 0
  public y: number = 0
  public index: number = 0

  getIdentification() {
    return this.index as any
  }

  render(parent: Selection<SVGGElement, any, BaseType, any>) {
    parent.append('circle').attr('r', 8)
  }

  position(self: Selection<SVGGElement, any, BaseType, any>) {
    self
      .select('circle')
      .attr('cx', this.x)
      .attr('cy', this.y)
  }
}
