import React from 'react'
import { Point } from './Point'
import { Viewport } from './Viewport'

interface ICanvasProps {
  viewport: Viewport
  updateViewport: (viewport: Viewport) => any,
}

interface ICanvasState {

}

export class Canvas extends React.Component <ICanvasProps, ICanvasState> {
  svgRef: React.RefObject<SVGSVGElement>
  panActive: boolean = false

  constructor(props: Readonly<ICanvasProps>) {
    super(props)
    this.onPanStart = this.onPanStart.bind(this)
    this.onPanMove = this.onPanMove.bind(this)
    this.onPanEnd = this.onPanEnd.bind(this)
    this.onZoom = this.onZoom.bind(this)
    this.svgRef = React.createRef()
  }

  private onPanMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { viewport } = this.props
    if (this.panActive && e.currentTarget) {
      viewport.center = viewport.center.subtract(
        viewport.pixelToGrid(
          new Point(e.movementX, e.movementY),
          e.currentTarget.getBoundingClientRect()
        )
      )
      this.props.updateViewport(viewport)
    }
  }

  onPanEnd() {
    this.panActive = false
  }

  onPanStart() {
    this.panActive = true
  }

  private onZoom(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { viewport } = this.props
    // TODO: according to docs `event.deltaY` is not stable, but it works fine so i've tested so far, consider using scroll events if anybody will experience improper behaviour
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
    const factor = 1 / viewport.gridUnit
    // @ts-ignore
    const zoomChange = (event.deltaY < 0 ? 1 : -1) * factor
    const zoomLevel = Math.max(factor, viewport.zoomLevel + zoomChange)
    if (zoomLevel !== viewport.zoomLevel && this.svgRef.current !== null) {
      const clientRect = event.currentTarget.getBoundingClientRect();
      // the position of mouse inside the container in pixels
      const internalPosition = new Point(
        event.clientX - clientRect.left,
        event.clientY - clientRect.top
      )
      const mousePosition = viewport.pixelToGrid(
        internalPosition, clientRect
      ).subtract(
        viewport.getScale().divide(new Point(2))
      );
      const nextMousePosition = mousePosition
        .divide(new Point(viewport.zoomLevel/zoomLevel))

      viewport.center = viewport.center.addition(
        mousePosition.subtract(nextMousePosition)
      )
      viewport.zoomLevel = zoomLevel
      this.props.updateViewport(viewport)
    }
  }


  render() {
    const { viewport } = this.props
    if (this.svgRef.current !== null) {
      const bbox = this.svgRef.current.getBoundingClientRect()
      viewport.setRatioByWidthAndHeight(bbox.width, bbox.height)
    }

    return (
      <div
        onMouseUp={this.onPanEnd}
        onMouseLeave={this.onPanEnd}
        onMouseDown={this.onPanStart}
        onMouseMove={this.onPanMove}
        onWheel={this.onZoom}
        className="canvas"
      >
        <svg viewBox={viewport.getViewBox()} ref={this.svgRef}>
          {this.props.children}
        </svg>
      </div>

    )
  }
}
