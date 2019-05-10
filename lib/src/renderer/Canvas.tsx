import * as React from 'react'
import { Colors } from '@blueprintjs/core';
import { DraggableCore, DraggableEvent, DraggableData } from 'react-draggable';
import { Viewport } from '../layout/Viewport';
import { Point } from '../layout/Point';
import { Rectangle } from '../layout/Rectangle';
import { getRefMatrix, applyMatrix } from './utils';
import { GraphLayout } from '../layout/GraphLayout';


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

  private onDragMove(e: DraggableEvent, data: DraggableData) {
    const { selectionMode, viewport } = this.props
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
      const center = viewport.center.subtract(gridOffset)
      this.props.updateViewport(viewport.setCenter(center));
    }
  }

  onDragEnd(e: DraggableEvent, data: DraggableData) {
    const { selectionMode, viewport } = this.props
    if (selectionMode) {
      const initial = viewport.config.pixelToGrid(this.dragInitial)
      const extent = viewport.config.pixelToGrid(this.dragExtent)
      const area = Rectangle.fromPoints(initial, extent)
      this.props.selectArea(area)
    }
    this.dragInitial = new Point(0, 0)
    this.dragExtent = new Point(0, 0)
    this.resizeSelection()
  }

  onDragStart(e: DraggableEvent, data: DraggableData) {
    this.props.clearSelection()
    const matrix = getRefMatrix(this.svgRef)
    this.dragInitial = applyMatrix(matrix, data.x, data.y)
    this.dragExtent = this.dragInitial
  }

  private onZoom(event: MouseWheelEvent) {
    event.preventDefault()
    event.stopPropagation()
    const { viewport } = this.props
    const direction = event.deltaY < 0 ? -1 : 1
    const matrix = getRefMatrix(this.svgRef)
    const target = applyMatrix(matrix, event.clientX, event.clientY)
    const gridTarget = viewport.config.pixelToGrid(target)
    const newViewport = viewport.zoomToPoint(gridTarget, direction)
    this.props.updateViewport(newViewport)
  }

  render() {
    const { viewport, selectionMode} = this.props
    const grid = `M ${viewport.config.gridUnit} 0 L 0 0 0 ${viewport.config.gridUnit}`
    const style:React.CSSProperties = {width: "100%", height: "100%", cursor: selectionMode ? 'crosshair' : 'grab'}
    return (
      <svg viewBox={viewport.viewBox} style={style} ref={this.svgRef} xmlns="http://www.w3.org/2000/svg">
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
          </g>
        </DraggableCore>
        <defs>
          <pattern id="grid" width={viewport.config.gridUnit} height={viewport.config.gridUnit} patternUnits="userSpaceOnUse">
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
