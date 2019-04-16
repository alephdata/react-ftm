import React from 'react'
import { Point } from './Point'

export interface IViewport {
  zoomFactor: number
  panCenter: Point
  UNIT: number
  RATIO:number
}

interface IViewportProps extends IViewport {}

export class Viewport extends React.PureComponent <IViewportProps> {
  state = { zoomFactor: 0, panCenter: new Point() }

  render() {
    const {UNIT, RATIO} = this.props;
    const scale = UNIT * this.props.zoomFactor;
    const height = scale * RATIO;
    const width = scale / RATIO;
    const viewportY = -((width / 2) + (UNIT * this.props.panCenter.y))
    const viewportX = -((height / 2) + (UNIT * this.props.panCenter.x))
    const viewBox = `${viewportX} ${viewportY} ${height} ${width}`
    return (
      <svg viewBox={viewBox} style={{
        fontSize: '1em',
        backgroundSize: `${UNIT}% ${UNIT * (Math.pow(RATIO, 2))}%`,
        backgroundImage: 'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)'
      }}>
        {this.props.children}
      </svg>)
  }
}
