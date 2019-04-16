import React, {MouseEvent} from 'react'
import { Point } from './Point'
import { IViewport } from './Viewport'

interface IPanProps extends IViewport{
  onZoomChanged:(zoomFactor:number)=> any,
  onPanChanged:(panCenter:Point)=> any,
}

interface IPanState {
  moving: boolean,
}

export class Pan extends React.Component<IPanProps,IPanState>{
  state:IPanState = { moving: false }

  constructor(props: Readonly<IPanProps>) {
    super(props)
    this.onStartMoving = this.onStartMoving.bind(this);
    this.move = this.move.bind(this);
    this.stop = this.stop.bind(this);
  }

  move(e: MouseEvent){
    const { moving } = this.state;
    if (moving) {
      const bBox = e.currentTarget.getBoundingClientRect();
      /*
      * detailed math
      * (((e.movementX / bBox.width) * 100) / 100) * (this.props.zoomFactor * this.props.RATIO)
      * (((e.movementY / bBox.height) * 100) / 100) * ((this.props.zoomFactor) / this.props.RATIO),
      * */
      const diff = Point.from(
        (e.movementX * this.props.zoomFactor * this.props.RATIO) / bBox.width,
        (e.movementY * this.props.zoomFactor) / (bBox.height * this.props.RATIO),
      );
      this.props.onPanChanged(this.props.panCenter
        .add(diff)
      )
    }
  }
  zoom = (event:any) => {
    // TODO: according to docs `event.deltaY` is not stable, but it works fine so i've tested so far, consider using scroll events if anybody will experience improper behaviour
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
    let zoomFactor = this.props.zoomFactor + ( (event.deltaY / 5))
    this.props.onZoomChanged(~Math.sign(zoomFactor) && zoomFactor )
  }
  stop(){
    this.setState({ moving: false })
  }
  onStartMoving(){
    this.setState({ moving: true })
  }
  render(){
    const {move, stop} = this;
    return (<div
      onMouseUp={stop}
      onMouseLeave={stop}
      onMouseDown={this.onStartMoving}
      onMouseMove={move}
      onWheel={this.zoom}
    >{this.props.children}</div>)
  }
}
