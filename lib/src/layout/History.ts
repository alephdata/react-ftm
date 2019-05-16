import {throttle} from "@blueprintjs/core/lib/esm/common/utils";
import {GraphLayout, IGraphLayoutData} from "./GraphLayout";

export class History {
  isPooling:boolean = false;
  stack:Array<IGraphLayoutData> = [];
  current?:IGraphLayoutData
  state:number = 0;
  private layout: GraphLayout;

  constructor(layout:GraphLayout) {
    this.layout = layout
    this.push(layout.toJSON())
  }

   push(item:IGraphLayoutData){
    if(this.isPooling) return undefined;
    this.stack.splice(this.state+1, this.stack.length, item);
    this.state = this.stack.length - 1;
    this.current = this.stack[this.state]
  }
  createChangePool(modifier:Function){
    this.isPooling = true;
    modifier();
    this.isPooling = false;
    this.push(this.layout.toJSON())
  }
  go(factor:number):GraphLayout{
    debugger;
    const nextPossibleState = this.state += factor;
    let nextState;

    if(factor > 0){
      nextState = Math.min(nextPossibleState, this.stack.length - 1)
    }else {
      nextState = Math.max(nextPossibleState, 0)
    }

    this.state = nextState
    this.current = this.stack[this.state];
    return this.layout.update(this.current)
  }
  back(){ return this.go(-1) }
  forward(){  return this.go(1) }
}
