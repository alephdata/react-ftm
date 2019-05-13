import { Colors } from '@blueprintjs/core';
import { Point } from './layout/Point';

export class GraphConfig {
  public gridUnit: number = 10
  public readonly VERTEX_COLOR: string = Colors.BLUE5
  public readonly SELECTED_COLOR: string = Colors.GOLD4
  public readonly SELECTED_COLOR2: string = Colors.GRAY4
  public readonly VERTEX_RADIUS: number = 1
  public readonly contentPadding: string = '10px'
  public readonly BORDER_COLOR: string = Colors.LIGHT_GRAY1

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
