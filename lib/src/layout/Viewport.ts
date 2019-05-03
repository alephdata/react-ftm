import { Point } from './Point'
import { GraphConfig } from '../GraphConfig';

export class Viewport {
  public readonly config: GraphConfig
  public center: Point
  public zoomLevel: number
  public gridUnit: number
  public ratio: number
  public viewBox?: string

  constructor(config: GraphConfig, zoomLevel: number = 1, ratio: number = 1, center?: Point) {
    this.config = config
    this.zoomLevel = zoomLevel
    this.ratio = ratio
    this.center = center || new Point()
    this.gridUnit = 10;
    this.viewBox = undefined
  }

  zoomedPixelToGrid(point: Point): Point {
    const zoomed = this.config.pixelToGrid(point)
    return new Point(
      zoomed.x / this.zoomLevel,
      zoomed.y / this.zoomLevel
    )
  }

  private computeViewBox() {
    const scaleX = 100 * this.gridUnit * this.zoomLevel;
    const scaleY = 100 * this.gridUnit * this.zoomLevel * this.ratio;
    const gridCenter = this.config.gridToPixel(this.center);
    const thisX = -((scaleX / 2) + (gridCenter.x * this.zoomLevel))
    const thisY = -((scaleY / 2) + (gridCenter.y * this.zoomLevel))
    this.viewBox = `${thisX} ${thisY} ${scaleX} ${scaleY}`
  }

  clone(): Viewport {
    const clone = Viewport.fromJSON(this.config, this.toJSON())
    clone.viewBox = this.viewBox
    return clone
  }

  setRatio(ratio: number): Viewport {
    const viewport = this.clone()
    viewport.ratio = ratio
    viewport.computeViewBox()
    return viewport
  }

  setCenter(center: Point): Viewport {
    const viewport = this.clone()
    viewport.center = center
    viewport.computeViewBox()
    return viewport
  }

  setZoom(target: Point, zoomLevel: number): Viewport {
    const viewport = this.clone()
    const boundedZoomLevel = Math.max(0.1, Math.min(2, zoomLevel))
    if (boundedZoomLevel === viewport.zoomLevel) {
      return this
    }
    const scaleChange = (1 / boundedZoomLevel) - (1 / this.zoomLevel)
    const offset = new Point(
      (target.x * scaleChange * -1),
      (target.y * scaleChange * -1),
    )
    viewport.center = this.center.addition(offset);
    viewport.zoomLevel = boundedZoomLevel
    viewport.computeViewBox()
    return viewport
  }

  toJSON(): any {
    // not storing gridUnit, seems to be constant so far. This
    // will probably need review some times.
    return {
      zoomLevel: this.zoomLevel,
      ratio: this.ratio,
      center: this.center.toJSON(),
    }
  }

  static fromJSON(config: GraphConfig, data: any): Viewport {
    const center = Point.fromJSON(data.center)
    return new Viewport(config, data.zoomLevel, data.ratio, center)
  }
}
