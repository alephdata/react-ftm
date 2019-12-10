import { Colors } from '@blueprintjs/core';
import { Point } from './layout/Point';

export interface IGraphConfig {
  gridUnit?: number,
  toolbarColor?: string,
  toolbarPosition?: string,
}

export class GraphConfig {
  public DEFAULT_VERTEX_COLOR: string = Colors.BLUE1
  public EDGE_COLOR: string = Colors.GRAY2
  public UNSELECTED_COLOR: string = Colors.GRAY5
  public VERTEX_RADIUS: number = 1
  public gridUnit: number
  public toolbarColor: string
  public toolbarPosition: string

  constructor(props?: IGraphConfig) {
    this.gridUnit = props && props.gridUnit || 10
    this.toolbarColor = props && props.toolbarColor || Colors.DARK_GRAY1
    this.toolbarPosition = props && props.toolbarPosition || "top"
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
}
