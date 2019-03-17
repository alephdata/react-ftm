import { CommonCollection, Edge, Layout, Vertex } from './core'
import { ISchemataDatum, Model } from './followthemoney'
import Renderer from './renderer/Renderer'
import { map } from 'rxjs/operators'
import { Draggable } from './extensions'
import { Extension } from './extensions/Extension'

export interface IGraphRenderer {
  vertices(list: CommonCollection<Vertex>): void
  edges(links: CommonCollection<Edge>): void
  positionOnly(): void
}
interface IZeroConfig {
  height?: number
  width?: number
  container: Element
  schemata: ISchemataDatum
}
export class ZeroConfig {
  public layout: Layout
  public renderer: Renderer
  public model: Model
  private extensions: Array<Extension> = []

  constructor({ height = 1080, width = 1179, container, schemata }: IZeroConfig) {
    // Represents the whole FtM semantics;
    this.model = new Model(schemata)

    // Headless engine for calculating node and link positions
    this.layout = new Layout({})

    // Single class responsible for rendering;
    this.renderer = new Renderer({
      height,
      width,
      container
    })

    // Letting render know when nodes added/removed in layout
    this.layout.nodes.onChange
      .pipe(map(event => event.collection))
      .subscribe(this.renderer.vertices)
    // Letting render know when edges added/removed in layout
    this.layout.links.onChange.pipe(map(event => event.collection)).subscribe(this.renderer.edges)

    // Layout is responsible for calculating positions on canvas,
    // this line passes coordinates from Layout to Renderer
    this.layout.onTick.subscribe(this.renderer.positionOnly)

    this.extensions.push(new Draggable(this.layout, this.renderer))
  }
}
