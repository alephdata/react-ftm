import { Point } from './Point'

export class Viewport {
  public center: Point
  public zoomLevel: number
  public gridUnit: number

  constructor(zoomLevel: number, center?: Point){
    this.zoomLevel = zoomLevel
    this.center = center || new Point()
    this.gridUnit = 6;
  }

  gridToPixel(point: Point): Point {
    return new Point({
      x: point.x * this.gridUnit,
      y: point.y * this.gridUnit
    })
  }

  // pixelToGrid(point: Point): Point {
  //   return new Point({
  //   })
  // }
}
