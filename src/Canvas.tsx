import React from 'react'
import { Point } from './Point'
import { Viewport } from './Viewport';
import { DraggableCore, DraggableEvent, DraggableData } from 'react-draggable';


interface ICanvasProps {
  viewport: Viewport
  updateViewport: (viewport: Viewport) => any,
}

interface ICanvasState {

}

export class Canvas extends React.Component <ICanvasProps, ICanvasState> {
  svgRef: React.RefObject<SVGSVGElement>
  panActive: boolean = false
  panOffset?: Point

  constructor(props: Readonly<ICanvasProps>) {
    super(props)
    this.onPanStart = this.onPanStart.bind(this)
    this.onPanMove = this.onPanMove.bind(this)
    this.onPanEnd = this.onPanEnd.bind(this)
    this.onZoom = this.onZoom.bind(this)
    this.svgRef = React.createRef();
  }

  private onPanMove(e: DraggableEvent, data: DraggableData) {
    const { viewport } = this.props
    if (this.panOffset !== undefined) {
      this.panOffset = new Point(
        this.panOffset.x + data.deltaX,
        this.panOffset.y + data.deltaY,
      )
      viewport.center = new Point(
        viewport.center.x + ((data.deltaX / viewport.gridUnit)),
        viewport.center.y + ((data.deltaY / viewport.gridUnit))
      )
      this.props.updateViewport(viewport);
    }
  }

  onPanEnd(e: DraggableEvent, data: DraggableData) {
    console.log('pan end', this.panOffset)
    this.panOffset = undefined
  }

  onPanStart() {
    this.panActive = true
    this.panOffset = new Point(0, 0)
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

    /// <g id="zoom" transform={`translate(${x}, ${y})`}>

    return (
      <svg width={800} height={600} viewBox={viewBox} ref={this.svgRef}>
        <DraggableCore
          handle="#canvas-handle"
          onStart={this.onPanStart}
          onDrag={this.onPanMove}
          onStop={this.onPanEnd}>
          <g id="zoom" onWheel={this.onZoom}>
            <rect id="canvas-handle" x="-5000" y="-5000" width="10000" height="10000" fill="#eee" />
            {this.props.children}
          </g>
        </DraggableCore>
      </svg>
    )
  }
}
