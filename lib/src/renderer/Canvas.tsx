import * as React from 'react'
import { Colors } from '@blueprintjs/core';
import { DraggableCore, DraggableEvent, DraggableData } from 'react-draggable';
import { Viewport } from '../layout/Viewport';
import { Point } from '../layout/Point';
import { Rectangle } from '../layout/Rectangle';
import { getRefMatrix, applyMatrix } from './utils';


interface ICanvasProps {
  viewport: Viewport,
  selectionMode: boolean,
  selectArea: (area: Rectangle) => any,
  clearSelection: () => any,
  updateViewport: (viewport: Viewport) => any,
}

export class Canvas extends React.Component <ICanvasProps> {
  svgRef: React.RefObject<SVGSVGElement>
  selectionRef: React.RefObject<SVGRectElement>
  dragInitial: Point
  dragExtent: Point
  nextViewport?: Viewport

  constructor(props: Readonly<ICanvasProps>) {
    super(props)
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragMove = this.onDragMove.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onZoom = this.onZoom.bind(this)
    this.onResize = this.onResize.bind(this)
    this.svgRef = React.createRef()
    this.selectionRef = React.createRef()
    this.dragInitial = new Point(0, 0)
    this.dragExtent = new Point(0, 0)
  }

  componentDidMount() {
    this.onResize()
    const svg = this.svgRef.current;
    if (svg !== null) {
      svg.addEventListener('wheel', this.onZoom)
      window.addEventListener('resize', this.onResize)
    }
  }

  componentWillUnmount() {
    const svg = this.svgRef.current;
    if (svg !== null) {
      svg.removeEventListener('wheel', this.onZoom)
      window.removeEventListener('resize', this.onResize)
    }
  }

  private onResize() {
    const { viewport } = this.props;
    const svg = this.svgRef.current;
    if (svg !== null) {
      const rect = svg.getBoundingClientRect()
      const ratio = rect.height / rect.width
      this.props.updateViewport(viewport.setRatio(ratio));
    }
  }

  private resizeSelection() {
    const selection = this.selectionRef.current
    if (selection) {
      const rect = Rectangle.fromPoints(this.dragInitial, this.dragExtent)
      selection.setAttribute('x', rect.x + '')
      selection.setAttribute('y', rect.y + '')
      selection.setAttribute('width', rect.width + '')
      selection.setAttribute('height', rect.height + '')
    }
  }

  private moveViewport(viewport: Viewport) {
    const svg = this.svgRef.current
    this.nextViewport = viewport
    if (svg && viewport.viewBox) {
      svg.setAttribute('viewBox', viewport.viewBox)
    }
  }

  private onDragMove(e: DraggableEvent, data: DraggableData) {
    const { selectionMode } = this.props
    const viewport = this.nextViewport || this.props.viewport;
    const matrix = getRefMatrix(this.svgRef)
    const current = applyMatrix(matrix, data.x, data.y)
    const last = applyMatrix(matrix, data.lastX, data.lastY)
    const offset = current.subtract(last)
    if (selectionMode) {
      this.dragExtent = new Point(
        this.dragExtent.x + offset.x,
        this.dragExtent.y + offset.y
      )
      this.resizeSelection()
    } else if (offset.x || offset.y) {
      const gridOffset = viewport.zoomedPixelToGrid(offset)
      const center = viewport.center.addition(gridOffset)
      this.moveViewport(viewport.setCenter(center))
    }
  }

  onDragEnd(e: DraggableEvent, data: DraggableData) {
    const { selectionMode, viewport } = this.props
    if (selectionMode) {
      const initial = viewport.pixelToGrid(this.dragInitial)
      const extent = viewport.pixelToGrid(this.dragExtent)
      const area = Rectangle.fromPoints(initial, extent)
      this.props.selectArea(area)
    } else if (this.nextViewport) {
      this.props.updateViewport(this.nextViewport);
    }
    this.dragInitial = new Point(0, 0)
    this.dragExtent = new Point(0, 0)
    this.nextViewport = undefined
    this.resizeSelection()
  }

  onDragStart(e: DraggableEvent, data: DraggableData) {
    const { viewport } = this.props;
    this.props.clearSelection()
    const matrix = getRefMatrix(this.svgRef)
    this.dragInitial = applyMatrix(matrix, data.x, data.y)
    this.dragExtent = this.dragInitial
    this.nextViewport = viewport
  }

  private onZoom(event: MouseWheelEvent) {
    const viewport = this.nextViewport || this.props.viewport
    const factor = 1 / viewport.gridUnit
    event.preventDefault()
    event.stopPropagation()
    // TODO: according to docs `event.deltaY` is not stable, but it works fine so i've tested so far, consider using scroll events if anybody will experience improper behaviour
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
    const zoomChange = (event.deltaY < 0 ? 1 : -1) * factor
    const zoomLevel = viewport.zoomLevel * (1 + zoomChange)
    if (zoomLevel !== viewport.zoomLevel) {
      const matrix = getRefMatrix(this.svgRef)
      const target = applyMatrix(matrix, event.clientX, event.clientY)
      const gridTarget = viewport.pixelToGrid(target)
      const newViewport = viewport.setZoom(gridTarget, zoomLevel)
      this.props.updateViewport(newViewport)
    }
  }

  render() {
    const viewport = this.nextViewport || this.props.viewport
    const grid = `M ${viewport.gridUnit} 0 L 0 0 0 ${viewport.gridUnit}`
    const style = {width: "100%", height: "100%"}
    return (
      <svg viewBox={viewport.viewBox} style={style} ref={this.svgRef} xmlns="http://www.w3.org/2000/svg" className="canvas">
        <DraggableCore
          handle="#canvas-handle"
          onStart={this.onDragStart}
          onDrag={this.onDragMove}
          onStop={this.onDragEnd}>
          <g id="zoom">
            <rect id="canvas-handle"
                  x="-5000"
                  y="-5000"
                  width="10000"
                  height="10000"
                  fill="url(#grid)" />
            {this.props.children}
            <rect id="selection"
                  ref={this.selectionRef}
                  stroke="black"
                  strokeWidth="0.5px"
                  strokeDasharray="2"
                  fillOpacity="0" />
            {/* <circle r="5" x={0} y={0} fill="red" /> */}
          </g>
        </DraggableCore>
        <defs>
          <pattern id="grid" width={viewport.gridUnit} height={viewport.gridUnit} patternUnits="userSpaceOnUse">
            <path d={grid} fill="none" stroke={Colors.LIGHT_GRAY3} strokeWidth="0.5"/>
          </pattern>
          <filter x="0" y="0" width="1" height="1" id="solid">
            <feFlood floodColor="#ffffff"/>
            <feComposite in="SourceGraphic"/>
          </filter>
        </defs>
      </svg>
    )
  }
}
