import { Point } from './Point'

export class ViewPort {
  public center: Point
  public zoomLevel: number
  public gridUnit: number

  constructor(zoomLevel: number, center?: Point){
    this.zoomLevel = zoomLevel
    this.center = center || new Point()
  }
}
