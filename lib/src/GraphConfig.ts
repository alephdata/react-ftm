import { Colors } from '@blueprintjs/core';
import { Point } from './layout/Point';

export class GraphConfig {
  public gridUnit: number = 10
  public vertexColor: string = Colors.BLUE5
  public selectedColor: string = Colors.BLUE2
  public vertexRadius: number = 1
  public contentPadding: string = '10px'
  public borderColor: string = Colors.LIGHT_GRAY1

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
