export class Point {
  x = 0
  y = 0
  set({ x = this.x, y = this.y }): Point {
    this.x = x
    this.y = y
    return this
  }
}
