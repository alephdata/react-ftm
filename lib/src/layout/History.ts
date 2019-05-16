import {throttle} from "@blueprintjs/core/lib/esm/common/utils";
import {GraphLayout, IGraphLayoutData} from "./GraphLayout";



export class History {
  isPooling:boolean = false;
  stack:Array<IGraphLayoutData> = [];
  index:number = 0;
  private layout: GraphLayout;

  constructor(layout:GraphLayout){
    this.layout = layout;
    this.push(this.layout.toJSON())
  }
  private purePush(item:IGraphLayoutData){
    this.index = this.stack.push(item) - 1
  }
  push = throttle(this.purePush.bind(this));
  go(factor:number){
    this.index += factor;
  }
  back(){ this.go(-1) }
  forward(){ if(this.isForwardable()){ this.go(1) } }
  isForwardable(){
    return this.stack.length > this.index
  }
}
