import { Point } from './Point'

export class Viewport {
  static DEFAULT_ZOOM = 4
  public center: Point
  public zoomLevel: number
  /* gridUnits indicates the conversion rate between internal UNIT's and svg pixels*/
  public gridUnit: number = 5
  public ratio = 1 // square

  constructor(zoomLevel: number = new.target.DEFAULT_ZOOM, center: Point = new Point()) {
    this.zoomLevel = zoomLevel
    this.center = center
  }


  setRatioByWidthAndHeight(width: number, height: number): number {
    this.ratio = width / height
    return this.ratio
  }


  gridToPixel(point: Point): Point {
    return point.multiply(new Point(this.gridUnit))
  }

  pixelToGrid(pixelPoint: Point, rect: ClientRect, zoomLevel:number = this.zoomLevel): Point {
    return pixelPoint.divide(
      Reflect.construct(Point,[rect.width, rect.height])
        .divide(this.getScale(zoomLevel))
    )
  }

  getScale(zoomLevel = this.zoomLevel):Point {
    return new Point(
      zoomLevel * this.ratio,
      zoomLevel / this.ratio
    )
  }

  /*
  * returns the viewport in units based on scale, and pan-center
  * viewport = scale/2 + pan-center
  * */
  getComputedCenter() {
    return this.getScale()
      .divide(new Point(-2))
      .addition(this.center)
  }

  getViewBox(): string {
    const {
      x: thisXInPixels, y: thisYInPixels
    } = this.gridToPixel(this.getComputedCenter())
    const {
      x: scaleXInPixels, y: scaleYInPixels
    } = this.gridToPixel(this.getScale())
    return `${thisXInPixels} ${thisYInPixels} ${scaleXInPixels} ${scaleYInPixels}`
  }
}
