import { Point } from './Point'

export class Viewport {
  public center: Point
  public zoomLevel: number
  public gridUnit: number
  public width?: number
  public height?: number
  public viewBox?: string

  constructor(zoomLevel: number = 1, center?: Point){
    this.zoomLevel = zoomLevel
    this.center = center || new Point()
    this.gridUnit = 10;
    this.viewBox = undefined
  }

  gridToPixel(point: Point): Point {
    return new Point(
      point.x * this.gridUnit,
      point.y * this.gridUnit
    )
  }

  pixelToGrid(point: Point): Point {
    return new Point(
      point.x / this.gridUnit,
      point.y / this.gridUnit
    )
  }

  zoomedPixelToGrid(point: Point): Point {
    const zoomed = this.pixelToGrid(point)
    return new Point(
      zoomed.x / this.zoomLevel,
      zoomed.y / this.zoomLevel
    )
  }

  computeViewBox() {
    if (this.width && this.height) {
      const scaleX = this.width * this.zoomLevel;
      const scaleY = this.height * this.zoomLevel;
      const gridCenter = this.gridToPixel(this.center);
      const thisX = -((scaleX / 2) + (gridCenter.x * this.zoomLevel))
      const thisY = -((scaleY / 2) + (gridCenter.y * this.zoomLevel))
      this.viewBox = `${thisX} ${thisY} ${scaleX} ${scaleY}`
    }
  }

  clone(): Viewport {
    const clone = Viewport.fromJSON(this.toJSON())
    clone.width = this.width
    clone.height = this.height
    clone.viewBox = this.viewBox
    return clone
  }

  setRect(rect: ClientRect | DOMRect): Viewport {
    const viewport = this.clone()
    viewport.width = rect.width
    viewport.height = rect.height
    viewport.computeViewBox()
    return viewport
  }

  setCenter(center: Point): Viewport {
    const viewport = this.clone()
    viewport.center = center
    viewport.computeViewBox()
    return viewport
  }

  setZoom(center: Point, zoomLevel: number): Viewport {
    const viewport = this.clone()
    viewport.center = center
    viewport.zoomLevel = zoomLevel
    viewport.computeViewBox()
    return viewport
  }

  toJSON(): any {
    // not storing gridUnit, seems to be constant so far. This
    // will probably need review some times.
    return {
      center: this.center.toJSON(),
      zoomLevel: this.zoomLevel
    }
  }

  static fromJSON(data: any): Viewport {
    const center = Point.fromJSON(data.center)
    return new Viewport(data.zoomLevel, center)
  }
}
