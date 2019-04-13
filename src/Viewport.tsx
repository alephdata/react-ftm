import React from 'react'
import { ICoordinates, Point } from './Point'

interface IViewport {
  zoomFactor: number,
  panCenter: Point
}

interface IViewportProps extends IViewport {
}

interface IViewportState extends IViewport {
  moving: ICoordinates | undefined
}

interface IPanState {
  moving: ICoordinates | undefined,
  panCenter: Point
  zoomFactor: number
}

interface IPanProps {
  children:(point:Point, zoomFactor: number)=>any
}
export class Pan extends React.Component<IPanProps,IPanState>{
  getInnerCoordinates(e: any): ICoordinates {
    const rect = e.currentTarget.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }
  convertPxToPoint(px: ICoordinates): Point {
    const scale = (1 + Number(this.state.zoomFactor)) // 100
    const height = scale * 1;
    const width = scale / 1;

    return new Point({
      x: px.x && ((px.x / 100) * width),
      y: px.y && ((px.y / 100) * height)
    })
  }
  state = {
    panCenter: new Point(),
    moving : undefined,
    zoomFactor: 0
  }
  stop = () => this.setState({ moving: undefined })
  move = (e: any) => {
    if (this.state.moving) {
      const nextCoordinates = this.getInnerCoordinates(e)
      const velocityInPixels = {
        // @ts-ignore
        x: this.state.moving.x - nextCoordinates.x,
        // @ts-ignore
        y: this.state.moving.y - nextCoordinates.y
      }
      const bBox = e.currentTarget.getBoundingClientRect();
      console.log(bBox, velocityInPixels)
      const velocityInPercentage = {
        x: (velocityInPixels.x / bBox.width) * 100,
        y:  (velocityInPixels.y / bBox.height) * 100
      }
      console.log('vel',velocityInPercentage)
      this.setState({ moving: nextCoordinates })
      const vInPoints = this.convertPxToPoint(velocityInPercentage)
      this.setState(({ panCenter }) => {
        const newPan = new Point({
          x: 1*panCenter.x - 1*vInPoints.x,
          y: 1*panCenter.y - 1*vInPoints.y
        })
        return ({
          panCenter: newPan
        })
      })
    }
  }
  zoom = (e:any) => {
    let zoomFactor = this.state.zoomFactor - ( (e.deltaY / 5))
    this.setState(({zoomFactor: ~Math.sign(zoomFactor) && zoomFactor }))
  }
  render(){
    const {move, stop} = this;
    return (<div
      onMouseUp={stop}
      onMouseLeave={stop}
      onMouseDown={(e) => {this.setState({ moving: this.getInnerCoordinates(e) }) }}
      onMouseMove={move}
      onWheel={this.zoom}
    >{this.props.children(this.state.panCenter, this.state.zoomFactor)}</div>)
  }
}
export class Viewport extends React.PureComponent <IViewportProps, IViewportState> {
  static getDerivedStateFromProps(props: IViewportProps, state: IViewportState) {
    return {
      zoomFactor: props.zoomFactor,
      panCenter: props.panCenter
    }
  }

  state = { zoomFactor: 0, panCenter: new Point(), moving: undefined }

  render() {
    const UNIT = 5
    const RATIO = 1
    const scale = UNIT * (1 + Number(this.state.zoomFactor))
    const height = scale * RATIO
    const width = scale / RATIO
    const viewportY = -((width / 2) + (UNIT * this.state.panCenter.y))
    const viewportX = -((height / 2) + (UNIT * this.state.panCenter.x))
    const viewBox = `${viewportX} ${viewportY} ${height} ${width}`
    // console.log('legit point', this.state.panCenter)
    return (
      <svg viewBox={viewBox} zoomAndPan={'magnify'} style={{
        fontSize: '1em',
        backgroundSize: `${UNIT}% ${UNIT * (Math.pow(RATIO, 2))}%`,
        backgroundImage: 'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)'
      }}>
        {this.props.children}
      </svg>)
  }
}
