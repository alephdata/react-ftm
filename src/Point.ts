
export interface ICoordinates {
  x:number
  y:number
}
export class Point implements ICoordinates{
  x = 0
  y = 0
  static from(x:number, y:number){
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
  add(term:Point):Point{
    return new Point({
      x:this.x + term.x,
      y:this.y + term.y,
    })
  }
  subtract(term:Point):Point {
    return new Point({
      x: this.x - term.x,
      y: this.y - term.y
    })
  }
}
