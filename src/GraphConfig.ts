import { Colors } from '@blueprintjs/core';
import { Point } from './layout/Point';

export class GraphConfig {
  public gridUnit: number = 10
  public VERTEX_COLOR: string = Colors.BLUE1
  public SELECTED_COLOR: string = Colors.BLUE5
  public SELECTED_COLOR2: string = Colors.GRAY4
  public VERTEX_RADIUS: number = 1
  public contentPadding: string = '10px'
  public BORDER_COLOR: string = Colors.LIGHT_GRAY1

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

}
