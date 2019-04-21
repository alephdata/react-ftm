import React from 'react'
import { Point } from './Point'
import { Viewport } from './Viewport';
import { emitKeypressEvents } from 'readline';

interface ICanvasProps {
  viewport: Viewport
  updateViewport: (viewport: Viewport) => any,
}

interface ICanvasState {

}

export class Canvas extends React.Component <ICanvasProps, ICanvasState> {
  svgRef: React.RefObject<SVGSVGElement>
  gRef: React.RefObject<SVGGElement>
  panActive: boolean = false
  panOrigin: Point | null = null

  constructor(props: Readonly<ICanvasProps>) {
    super(props)
    this.onPanStart = this.onPanStart.bind(this)
    this.onPanMove = this.onPanMove.bind(this)
    this.onPanEnd = this.onPanEnd.bind(this)
    this.onZoom = this.onZoom.bind(this)
    this.svgRef = React.createRef();
    this.gRef = React.createRef();
  }

  private onPanMove(e: React.MouseEvent<SVGGElement, MouseEvent>) {
    const { viewport } = this.props
    if (this.panActive && e.currentTarget) {
      viewport.center = new Point(
        viewport.center.x + ((e.movementX / viewport.gridUnit)),
        viewport.center.y + ((e.movementY / viewport.gridUnit))
      )
      this.props.updateViewport(viewport);
    }
  }

  onPanEnd() {
    this.panActive = false;
    this.panOrigin = null;
  }

  onPanStart() {
    const { viewport } = this.props
    this.panActive = true
    this.panOrigin = viewport.center
  }

  private onZoom(event: React.MouseEvent<SVGGElement, MouseEvent>) {
    const { viewport } = this.props;
    // TODO: according to docs `event.deltaY` is not stable, but it works fine so i've tested so far, consider using scroll events if anybody will experience improper behaviour
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
    const factor = 1 / viewport.gridUnit
    // @ts-ignore
    const zoomChange = (event.deltaY < 0 ? 1 : -1) * factor;
    const zoomLevel = Math.max(factor, viewport.zoomLevel + zoomChange);
    if (zoomLevel !== viewport.zoomLevel && this.svgRef.current !== null) {
      const clientRect = this.svgRef.current.getBoundingClientRect();
      const center = new Point(clientRect.width / 2, clientRect.height / 2)
      const scaleChange = (1 / zoomLevel) - (1 / viewport.zoomLevel)
      const offset = new Point(
        ((event.clientX - center.x) * scaleChange * -1),
        ((event.clientY - center.y) * scaleChange * -1),
      )
      const gridOffset = viewport.pixelToGrid(offset)
      viewport.center = viewport.center.addition(gridOffset);
      viewport.zoomLevel = zoomLevel
      this.props.updateViewport(viewport)
    }
  }

  // componentDidMount() {
  //   if (this.svgRef.current !== null) {
  //     console.log(this.svgRef.current.getBoundingClientRect())
  //   }
  // }

  render() {
    const { viewport } = this.props
    let viewBox = viewport.getViewBox(100, 100);
    if (this.svgRef.current !== null) {
      const bbox = this.svgRef.current.getBoundingClientRect()
      viewBox = viewport.getViewBox(bbox.width, bbox.height)
    }

    return (
      <svg width={800} height={600} viewBox={viewBox} ref={this.svgRef}>
        <g
          ref={this.gRef}
          onMouseUp={this.onPanEnd}
          onMouseLeave={this.onPanEnd}
          onMouseDown={this.onPanStart}
          onMouseMove={this.onPanMove}
          onWheel={this.onZoom}
        >
          <rect id="canvas-handle" x="-5000" y="-5000" width="10000" height="10000" fill="#eee" />
          {this.props.children}
        </g>
      </svg>
    )
  }
}
