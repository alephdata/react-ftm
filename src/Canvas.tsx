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

  constructor(props: Readonly<ICanvasProps>) {
    super(props)
    this.onPanStart = this.onPanStart.bind(this)
    this.onPanMove = this.onPanMove.bind(this)
    this.onPanEnd = this.onPanEnd.bind(this)
    this.onZoom = this.onZoom.bind(this)
    this.onResize = this.onResize.bind(this)
    this.svgRef = React.createRef();
  }

  componentDidMount() {
    const svg = this.svgRef.current;
    if (svg !== null) {
      svg.addEventListener('resize', this.onResize)
      svg.addEventListener('wheel', this.onZoom)
      this.onResize()
    }
  }

  componentWillUnmount() {
    const svg = this.svgRef.current;
    if (svg !== null) {
      svg.removeEventListener('resize', this.onResize)
      svg.removeEventListener('wheel', this.onZoom)
    }
  }

  private onResize() {
    const { viewport } = this.props;
    const svg = this.svgRef.current;
    if (svg !== null) {
      const rect = svg.getBoundingClientRect();
      this.props.updateViewport(viewport.setRect(rect));
    }
  }

  private onPanMove(e: DraggableEvent, data: DraggableData) {
    const { viewport } = this.props
    const center = new Point(
      viewport.center.x + ((data.deltaX / viewport.gridUnit)),
      viewport.center.y + ((data.deltaY / viewport.gridUnit))
    )
    this.props.updateViewport(viewport.setCenter(center));
  }

  onPanEnd(e: DraggableEvent, data: DraggableData) {
  }

  onPanStart() {
  }

  private onZoom(event: MouseWheelEvent) {
    const { viewport } = this.props;
    event.preventDefault()
    event.stopPropagation()
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
      const newCenter = viewport.center.addition(gridOffset);
      this.props.updateViewport(viewport.setZoom(newCenter, zoomLevel))
    }
  }

  render() {
    const { viewport } = this.props
    return (
      <svg width={800} height={600} viewBox={viewport.viewBox} ref={this.svgRef}>
        <DraggableCore
          handle="#canvas-handle"
          onStart={this.onPanStart}
          onDrag={this.onPanMove}
          onStop={this.onPanEnd}>
          <g id="zoom">
            <rect id="canvas-handle" x="-5000" y="-5000" width="10000" height="10000" fill="#eee" />
            {this.props.children}
          </g>
        </DraggableCore>
      </svg>
    )
  }
}
