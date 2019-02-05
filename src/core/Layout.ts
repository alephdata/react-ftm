import * as d3 from 'd3'
import { Vertex } from './Vertex'
import { Edge } from './Edge'
import NodeCollection from './NodeCollection'
import { LinkCollection } from './LinkCollection'
import { BehaviorSubject, merge, Observable } from 'rxjs'
import { CommonCollectionStorage, ICommonCollectionEvent } from './CommonCollection'

export interface IGraphRenderer {
  restartNodes(nodes: CommonCollectionStorage<Vertex>): void
  restartLinks(links: CommonCollectionStorage<Edge>): void
  updatePositions(): void
}
interface IGraphConfiguration {
  links?: Edge[]
  nodes?: Vertex[]
}

/**
 * core's headless engine, holds coordinates of `Nodes` `Links` and core itself{height/width}.
 * Responsible for configuring forces affecting on Layout.
 */
export class Layout {
  public readonly links: LinkCollection = new LinkCollection()
  public readonly onChange: Observable<
    ICommonCollectionEvent<Vertex> | ICommonCollectionEvent<Edge>
  >
  public readonly onTick = new BehaviorSubject('ttt')
  public readonly simulation: d3.Simulation<Vertex, undefined>
  public readonly nodes: NodeCollection = new NodeCollection()

  constructor(configuration: IGraphConfiguration) {
    // if (configuration.context) {
    //     this.context = configuration.context;
    // } else {
    //     throw console.error(new Error('Context is required'));
    // }

    if (configuration.links) {
      this.addLinks(...configuration.links)
    }
    if (configuration.nodes) {
      this.addNodes(...configuration.nodes)
    }

    this.simulation = d3
      .forceSimulation(this.nodes.toArray())
      .force('charge', d3.forceManyBody().strength(-200))
      // .force('center', d3.forceCenter())
      .force('collide', d3.forceCollide(8 * 1.5).strength(1))
      // @ts-ignore
      .force(
        'link',
        d3.forceLink<Vertex, Edge>(this.links.toArray())
        // .id((d) => d.entity.id)
      )
      .force('x', d3.forceX())
      .force('y', d3.forceY())
      .alphaTarget(1)
      .on('tick', () => this.onTick.next('kk'))

    this.onChange = merge(this.nodes.onChange, this.links.onChange)
    this.onChange.subscribe(this.restart.bind(this))
  }

  private restart() {
    this.simulation.nodes(this.nodes.toArray())
    this.simulation
      // @ts-ignore
      .force(
        'link',
        d3
          .forceLink<Vertex, Edge>(this.links.toArray())
          // @ts-ignore
          .distance(100)
        // .id(d => d.entity.id)
      )
    this.simulation.alpha(1).restart()
  }
  addNode(node: Vertex): Vertex {
    this.nodes.add(node)
    return node
  }

  addNodes(...nodes: Array<Vertex>): Layout {
    nodes.forEach(node => this.addNode(node))
    return this
  }

  removeNode(node: Vertex) {
    this.nodes.remove(node)
  }

  addLinks(...links: Array<Edge>): Layout {
    links.forEach(link => this.addLink(link))
    return this
  }

  addLink(link: Edge): Edge {
    this.links.add(link)
    return link
  }

  removeLink(link: Edge) {
    this.links.remove(link)
  }
}
