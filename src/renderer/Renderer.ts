import * as d3 from 'd3'
import { Vertex } from '../core/Vertex'
import { Selection } from 'd3-selection'
import { IGraphRenderer } from '../core/Layout'
import { CommonCollectionStorage } from '../core/CommonCollection'
import { Edge } from '../core/Edge'
import { NodeRenderer } from './NodeRenderer'
import { LinkRenderer } from './LinkRenderer'

interface IGraphConfiguration {
  container: Element | null
  height: number
  width: number
}

export interface ICollectionRenderer<T> {
  render(collection: CommonCollectionStorage<T>): void
  updatePositions(): void
}
export default class Renderer implements IGraphRenderer {
  private rootContainer: Selection<Element, any, HTMLElement | null, undefined>
  private svgContainer: Selection<SVGSVGElement, any, HTMLElement | null, undefined>
  public nodeRenderer: NodeRenderer
  public linkRenderer: LinkRenderer
  private readonly width: number
  private readonly height: number
  private readonly containerG: Selection<SVGGElement, any, HTMLElement | null, undefined>

  constructor(configuration: IGraphConfiguration) {
    if (configuration.container) {
      this.rootContainer = d3.select(configuration.container)
    } else {
      throw console.error(new Error('`configuration.container`must be set'))
    }

    if (configuration.width) {
      this.width = configuration.width
    } else {
      throw console.error(new Error('`configuration.width` must be set'))
    }

    if (configuration.height) {
      this.height = configuration.height
    } else {
      throw console.error(new Error('`configuration.height` must be set'))
    }

    // SETTINGS END ---

    this.svgContainer = this.rootContainer
      .append('div')
      .classed('svg-container', true)
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .classed('svg-content-responsive', true)

    this.containerG = this.svgContainer
      .append('g')
      .attr(
        'transform',
        'translate(' + configuration.width / 2 + ',' + configuration.height / 2 + ')'
      )

    this.linkRenderer = new LinkRenderer(this.containerG)
    this.nodeRenderer = new NodeRenderer(this.containerG)

    this.restartLinks = this.restartLinks.bind(this)
    this.restartNodes = this.restartNodes.bind(this)
    this.updatePositions = this.updatePositions.bind(this)
  }

  restartNodes(nodes: CommonCollectionStorage<Vertex>) {
    this.nodeRenderer.render(nodes)
  }
  restartLinks(links: CommonCollectionStorage<Edge>) {
    this.linkRenderer.render(links)
  }
  updatePositions() {
    this.nodeRenderer.updatePositions()

    this.linkRenderer.updatePositions()
  }
}
