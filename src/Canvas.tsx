import React from 'react'
import { Point } from './Point'
import { Viewport } from './Viewport';

export interface ICanvas {
  zoomFactor: number
  panCenter: Point
  UNIT: number
}

interface ICanvasProps {
  viewport: Viewport
}

export class Canvas extends React.PureComponent <ICanvasProps> {
  svgRef: React.RefObject<SVGSVGElement>
  gRef: React.RefObject<SVGGElement>

  constructor(props: any) {
    super(props);
    this.svgRef = React.createRef();
    this.gRef = React.createRef();
  }

  render() {
    const { viewport } = this.props
    // if (this.gRef.current !== null) {
    //   const bbox = this.gRef.current.getBBox()
    //   console.log(bbox.width, bbox.height);
    // }
    const RATIO = 1;
    const scale = viewport.gridUnit * viewport.zoomLevel;
    const height = scale * RATIO;
    const width = scale / RATIO;
    const viewportY = -((height / 2) + (viewport.gridUnit * viewport.center.y))
    const viewportX = -((width / 2) + (viewport.gridUnit * viewport.center.x))
    const viewBox = `${viewportX} ${viewportY} ${height} ${width}`
    return (
      <svg viewBox={viewBox} ref={this.svgRef} style={{
        fontSize: '1em',
        backgroundSize: `${100/viewport.zoomLevel}% ${(100/viewport.zoomLevel) * (Math.pow(RATIO, 2))}%`,
        backgroundPositionX: (50 * viewport.center.x) + '%',
        backgroundPositionY: (50 * viewport.center.y) + '%',
        backgroundImage: 'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)'
      }}>
        <g ref={this.gRef}>
          {this.props.children}
        </g>
      </svg>)
  }
}
