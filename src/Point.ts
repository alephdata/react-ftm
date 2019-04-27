
export class Point {
  x: number
  y: number

  constructor(x: number = 0, y: number = 0){
    this.x = x
    this.y = y
  }

  addition(addend: Point): Point{
    return new Point(
      this.x + addend.x,
      this.y + addend.y,
    )
  }

  subtract(term: Point): Point {
    return new Point(
      this.x - term.x,
      this.y - term.y
    )
  }

  divide(divisor: Point): Point {
    return new Point(
      this.x / divisor.x,
      this.y / divisor.y,
    )
  }

  multiply(term: Point): Point {
    return new Point(
      this.x * term.x,
      this.y * term.y,
    )
  }
}
