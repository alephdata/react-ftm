import { Point } from './Point';


export class Rectangle {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number

  constructor(x: number, y: number, width: number = 0, height: number = 0) {
    this.x = x
    this.y = y
    this.width = Math.max(0, width)
    this.height = Math.max(0, height)
  }

  getCenter(): Point {
    return new Point(
      this.x + (this.width / 2),
      this.y + (this.height / 2),
    )
  }

  contains(point: Point): boolean {
    return (
      this.x <= point.x &&
      this.y <= point.y &&
      (this.x + this.width) >= point.x &&
      (this.y + this.height) >= point.y
    )
  }

  static fromPoints(...points: Point[]): Rectangle {
    if (points.length) {
      const xs = points.map((p) => p.x)
      const ys = points.map((p) => p.y)
      const x = Math.min(...xs)
      const y = Math.min(...ys)
      const mx = Math.max(...xs)
      const my = Math.max(...ys)
      return new Rectangle(x, y, mx - x, my - y)
    }
    return new Rectangle(0, 0, 0, 0)
  }
}
