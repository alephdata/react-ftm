import { Point } from './Point'

export class Viewport {
  public center: Point
  public zoomLevel: number
  public gridUnit: number
  public svg?: SVGSVGElement
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

  private computeViewBox() {
    const scaleX = 100 * this.gridUnit * this.zoomLevel;
    const scaleY = 100 * this.gridUnit * this.zoomLevel;
    const gridCenter = this.gridToPixel(this.center);
    const thisX = -((scaleX / 2) + (gridCenter.x * this.zoomLevel))
    const thisY = -((scaleY / 2) + (gridCenter.y * this.zoomLevel))
    this.viewBox = `${thisX} ${thisY} ${scaleX} ${scaleY}`
  }

  applyMatrix(x: number, y: number): Point {
    if (this.svg) {
      const ctm = this.svg.getScreenCTM() as DOMMatrix
      return new Point(
        (x - ctm.e) / ctm.a,
        (y - ctm.f) / ctm.d
      )
    }
    return new Point(0, 0)
  }

  clone(): Viewport {
    const clone = Viewport.fromJSON(this.toJSON())
    clone.svg = this.svg
    clone.viewBox = this.viewBox
    return clone
  }

  setSvg(svg: SVGSVGElement): Viewport {
    const viewport = this.clone()
    viewport.svg = svg
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
