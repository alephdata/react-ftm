import { Point } from './Point'

export class Viewport {
  public center: Point
  public zoomLevel: number
  public gridUnit: number

  constructor(zoomLevel: number = 1, center?: Point){
    this.zoomLevel = zoomLevel
    this.center = center || new Point()
    this.gridUnit = 10;
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

  getViewBox(width: number, height: number): string {
    // const heightCount = width / this.gridUnit
    // const widthCount = heightCount * (height / width)
    const scaleX = width * this.zoomLevel;
    const scaleY = height * this.zoomLevel;
    const gridCenter = this.gridToPixel(this.center);
    const thisX = -((scaleX / 2) + (gridCenter.x * this.zoomLevel))
    const thisY = -((scaleY / 2) + (gridCenter.y * this.zoomLevel))
    return `${thisX} ${thisY} ${scaleX} ${scaleY}`
  }
}
