
export interface ICoordinates {
  x:number
  y:number
}

export class Point implements ICoordinates{
  x = 0
  y = 0

  static from(x:number, y:number = x){
    return new Point({x, y})
  }

  constructor(coordinates?:ICoordinates){
    if(coordinates){ this.set(coordinates) }
  }

  set({ x = this.x, y = this.y }): Point {
    this.x = x
    this.y = y
    return this
  }

  addition(addend:ICoordinates):Point{
    return new Point({
      x:this.x + addend.x,
      y:this.y + addend.y,
    })
  }

  subtract(term:ICoordinates):Point {
    return new Point({
      x: this.x - term.x,
      y: this.y - term.y
    })
  }

  divide(divisor:ICoordinates):Point{
    return new Point({
      x:this.x / divisor.x,
      y:this.y / divisor.y,
    })
  }

  multiply(term:ICoordinates) : Point{
    return new Point({
      x: this.x * term.x,
      y: this.y * term.y,
    })
  }
}
