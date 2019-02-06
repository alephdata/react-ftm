import { Layout } from './core'
import { Model } from './followthemoney/model'
import Renderer from './renderer/Renderer'
import { map } from 'rxjs/operators'
import { Draggable } from './extensions'

interface IZeroConfig {
  height?: number
  width?: number
  container: Element
}
export class ZeroConfig {
  public layout: Layout
  public renderer: Renderer
  private draggable?: Draggable

  constructor({ height = 1080, width = 1179, container }: IZeroConfig) {
    this.layout = new Layout({
      // context: new Model(schemata)
    })
    this.renderer = new Renderer({
      height,
      width,
      container
    })
    this.layout.nodes.onChange.pipe(map(event => event.collection))
    // .subscribe(this.renderer.restartNodes);
    this.layout.links.onChange.pipe(map(event => event.collection))
    // .subscribe(this.renderer.restartLinks);
    this.layout.onTick.subscribe(this.renderer.updatePositions)
    this.draggable = new Draggable(this.layout, this.renderer)
  }
}
