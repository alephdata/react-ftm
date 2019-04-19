import React from 'react'
import { Point } from './Point'
import { Viewport } from './Viewport';

interface ICanvasProps {
  viewport: Viewport
  updateViewport: (viewport: Viewport) => any,
}

interface ICanvasState {
  panning: boolean,
}

export class Canvas extends React.Component <ICanvasProps, ICanvasState> {
  svgRef: React.RefObject<SVGSVGElement>
  gRef: React.RefObject<SVGGElement>
  state: ICanvasState = { panning: false }

  constructor(props: Readonly<ICanvasProps>) {
    super(props)
    this.onPanStart = this.onPanStart.bind(this)
    this.onPanMove = this.onPanMove.bind(this)
    this.onPanEnd = this.onPanEnd.bind(this)
    this.onZoom = this.onZoom.bind(this)
    this.svgRef = React.createRef();
    this.gRef = React.createRef();
  }

  private onPanMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { viewport } = this.props
    if (this.state.panning && e.currentTarget) {
      /*
      * detailed math
      * (((e.movementX / bBox.width) * 100) / 100) * (this.props.zoomLevel * this.props.RATIO)
      * (((e.movementY / bBox.height) * 100) / 100) * ((this.props.zoomLevel) / this.props.RATIO),
      * */
      const offset = this.getPixelInUnits(
        Point.from(e.movementX, e.movementY),
        e.currentTarget.getBoundingClientRect()
      )
      viewport.center = offset.addition(viewport.center);
      this.props.updateViewport(viewport);
    }
  }

  onPanEnd() {
    this.setState({ panning: false })
  }

  onPanStart() {
    this.setState({ panning: true })
  }

  getPixelInUnits(pixelPoint: Point, rect: ClientRect): Point {
    const { zoomLevel } = this.props.viewport;
    const RATIO = 1;
    return pixelPoint.divide({
      x: (rect.width / (zoomLevel / RATIO)),
      y: (rect.height / (zoomLevel * RATIO))
    })
  }

  private onZoom(event: React.MouseEvent) {
    // TODO: according to docs `event.deltaY` is not stable, but it works fine so i've tested so far, consider using scroll events if anybody will experience improper behaviour
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
    // @ts-ignore
    const zoomChange = event.deltaY < 0 ? -1 : 1;
    const { viewport } = this.props;
    const RATIO = 1;
    let zoomLevel = viewport.zoomLevel + zoomChange
    if (zoomLevel !== 0 && (zoomLevel !== viewport.zoomLevel)) {
      const clientRect = event.currentTarget.getBoundingClientRect();
      // the position of mouse inside the container in pixels
      const internalPosition = Point.from(
        event.clientX - clientRect.left,
        event.clientY - clientRect.top
      )
      const widthInUnits = viewport.zoomLevel * RATIO;
      const heightInUnits = viewport.zoomLevel / RATIO;
      const mousePosition = this.getPixelInUnits(internalPosition, clientRect)
        .subtract(Point.from(
          (widthInUnits / 2),
          (heightInUnits / 2)
        ));

      // mouse position in the next zoom scale
      const nextMousePosition = mousePosition
        .divide(Point.from(viewport.zoomLevel/zoomLevel))

      const nextPan = viewport.center.subtract(
        mousePosition.subtract(nextMousePosition)
      )
      viewport.zoomLevel = zoomLevel
      viewport.center = nextPan
      this.props.updateViewport(viewport)
    }
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
      <div
        onMouseUp={this.onPanEnd}
        onMouseLeave={this.onPanEnd}
        onMouseDown={this.onPanStart}
        onMouseMove={this.onPanMove}
        onWheel={this.onZoom}
      >
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
        </svg>
      </div>)
  }
}
