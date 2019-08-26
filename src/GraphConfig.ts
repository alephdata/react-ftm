import { Colors } from '@blueprintjs/core';
import { Point } from './layout/Point';

export class GraphConfig {
  public gridUnit: number = 10
  public DEFAULT_VERTEX_COLOR: string = 'BLUE'
  public EDGE_COLOR: string = Colors.GRAY2
  public EDGE_SELECTED_COLOR: string = Colors.GRAY5
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
