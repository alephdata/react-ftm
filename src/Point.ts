
export interface ICoordinates {
  x:number
  y:number
}
export class Point implements ICoordinates{
  x = 0
  y = 0
  constructor(coordinates?:ICoordinates){
    if(coordinates){
      this.x = coordinates.x;
      this.y = coordinates.y;
    }
  }
  set({ x = this.x, y = this.y }): Point {
    this.x = x
    this.y = y
    return this
  }
}
