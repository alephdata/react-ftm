import React from 'react'
import { Point } from './Point'
import { Viewport } from './Viewport';
import { DraggableCore, DraggableEvent, DraggableData } from 'react-draggable';


interface ICanvasProps {
  viewport: Viewport
  updateViewport: (viewport: Viewport) => any,
}

export class Canvas extends React.Component <ICanvasProps> {
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
      this.props.updateViewport(viewport.setSvg(svg));
    }
  }

  private onPanMove(e: DraggableEvent, data: DraggableData) {
    const { viewport } = this.props
    const current = viewport.applyMatrix(data.x, data.y)
    const last = viewport.applyMatrix(data.lastX, data.lastY)
    const offset = current.subtract(last)
    if (offset.x || offset.y) {
      const center = new Point(
        viewport.center.x + ((offset.x / viewport.gridUnit) / viewport.zoomLevel),
        viewport.center.y + ((offset.y / viewport.gridUnit) / viewport.zoomLevel)
      )
      this.props.updateViewport(viewport.setCenter(center));
    }
  }

  onPanEnd(e: DraggableEvent, data: DraggableData) {
  }

  onPanStart() {
  }

  private onZoom(event: MouseWheelEvent) {
    const { viewport } = this.props;
    const factor = 1 / viewport.gridUnit
    event.preventDefault()
    event.stopPropagation()
    // TODO: according to docs `event.deltaY` is not stable, but it works fine so i've tested so far, consider using scroll events if anybody will experience improper behaviour
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
    // @ts-ignore
    const zoomChange = (event.deltaY < 0 ? 1 : -1) * factor;
    const zoomLevel = viewport.zoomLevel + zoomChange;
    if (zoomLevel !== viewport.zoomLevel && zoomLevel > (factor * 2)) {
      const target = viewport.applyMatrix(event.clientX, event.clientY)
      const scaleChange = (1 / zoomLevel) - (1 / viewport.zoomLevel)
      const offset = new Point(
        ((target.x - viewport.center.x) * scaleChange * -1),
        ((target.y - viewport.center.y) * scaleChange * -1),
      )
      const gridOffset = viewport.pixelToGrid(offset)
      const newCenter = viewport.center.addition(gridOffset);
      this.props.updateViewport(viewport.setZoom(newCenter, zoomLevel))
    }
  }

  render() {
    const { viewport } = this.props
    const grid = `M ${viewport.gridUnit} 0 L 0 0 0 ${viewport.gridUnit}`
    return (
      <svg viewBox={viewport.viewBox} ref={this.svgRef} xmlns="http://www.w3.org/2000/svg">
        <DraggableCore
          handle="#canvas-handle"
          onStart={this.onPanStart}
          onDrag={this.onPanMove}
          onStop={this.onPanEnd}>
          <g id="zoom">
            <rect id="canvas-handle" x="-5000" y="-5000" width="10000" height="10000" fill="url(#grid)" />
            {this.props.children}
          </g>
        </DraggableCore>
        <defs>
          <pattern id="grid" width={viewport.gridUnit} height={viewport.gridUnit} patternUnits="userSpaceOnUse">
            <path d={grid} fill="none" stroke="#ccc" strokeWidth="0.5"/>
          </pattern>
        </defs>
      </svg>
    )
  }
}
