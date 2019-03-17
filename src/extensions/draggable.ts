import * as d3 from 'd3'
import { Layout } from '../core/Layout'
import Renderer from '../renderer/Renderer'
import { Extension } from './Extension'

export class Draggable implements Extension {
  private renderer: Renderer
  private layout: Layout
  constructor(layout: Layout, renderer: Renderer) {
    this.layout = layout
    this.renderer = renderer
    this.layout.onChange.subscribe(() =>
      this.renderer.nodeRenderer.container.call(this.onDrag(this.layout.simulation))
    )
  }
  onDrag(simulation: d3.Simulation<any, undefined>) {
    // TODO" must be refactored
    function dragstarted(d: { fx: any; x: any; fy: any; y: any }) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(d: { fx: any; fy: any }) {
      d.fx = d3.event.x
      d.fy = d3.event.y
    }

    function dragended() {
      if (!d3.event.active) simulation.alphaTarget(0)
      // d.fx = null;
      // d.fy = null;
    }

    return (
      d3
        .drag()
        // @ts-ignore
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    )
  }
}
