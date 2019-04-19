import React from 'react'
import { Point } from './Point'

export interface ICanvas {
  zoomFactor: number
  panCenter: Point
  UNIT: number
  RATIO:number
}

interface ICanvasProps extends ICanvas {}

export class Canvas extends React.PureComponent <ICanvasProps> {
  state = { zoomFactor: 0, panCenter: new Point() }

  render() {
    const {UNIT, RATIO} = this.props;
    const scale = UNIT * this.props.zoomFactor;
    const height = scale * RATIO;
    const width = scale / RATIO;
    const viewportY = -((height / 2) + (UNIT * this.props.panCenter.y))
    const viewportX = -((width / 2) + (UNIT * this.props.panCenter.x))
    const viewBox = `${viewportX} ${viewportY} ${height} ${width}`
    return (
      <svg viewBox={viewBox} style={{
        fontSize: '1em',
        backgroundSize: `${100/this.props.zoomFactor}% ${(100/this.props.zoomFactor) * (Math.pow(RATIO, 2))}%`,
        backgroundPositionX: (50 * this.props.panCenter.x) + '%',
        backgroundPositionY: (50 * this.props.panCenter.y) + '%',
        backgroundImage: 'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)'
      }}>
        {this.props.children}
      </svg>)
  }
}
