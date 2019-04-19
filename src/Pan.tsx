import React, { MouseEvent } from 'react'
import { Point } from './Point'
import { Viewport } from './Viewport';

interface IPanProps {
  viewport: Viewport
  onZoomChanged: (zoomLevel: number, panCenter?:Point) => any,
  onPanChanged: (panCenter: Point) => any,
}

interface IPanState {
  moving: boolean,
}

export class Pan extends React.Component<IPanProps, IPanState> {
  state: IPanState = { moving: false }

  constructor(props: Readonly<IPanProps>) {
    super(props)
    this.onStartMoving = this.onStartMoving.bind(this)
    this.move = this.move.bind(this)
    this.stop = this.stop.bind(this)
    this.zoom = this.zoom.bind(this)
  }

  private move(e: MouseEvent) {
    const { moving } = this.state
    if (moving) {
      /*
      * detailed math
      * (((e.movementX / bBox.width) * 100) / 100) * (this.props.zoomLevel * this.props.RATIO)
      * (((e.movementY / bBox.height) * 100) / 100) * ((this.props.zoomLevel) / this.props.RATIO),
      * */
      this.props.onPanChanged(
        this.getPixelInUnits(
          Point.from(e.movementX, e.movementY),
          e.currentTarget.getBoundingClientRect()
        )
          .addition(this.props.viewport.center)
      )
    }
  }

  getPixelInUnits(pixelPoint: Point, rect: ClientRect): Point {
    const { zoomLevel } = this.props.viewport;
    const RATIO = 1;
    return pixelPoint.divide({
      x: (rect.width / (zoomLevel / RATIO)),
      y: (rect.height / (zoomLevel * RATIO))
    })
  }

  private zoom(event: React.MouseEvent) {
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
      this.props.onZoomChanged(
        zoomLevel,
        nextPan,
      );
    }
  }

  stop() {
    this.setState({ moving: false })
  }

  onStartMoving() {
    this.setState({ moving: true })
  }

  render() {
    const { move, stop } = this
    return (<div
      onMouseUp={stop}
      onMouseLeave={stop}
      onMouseDown={this.onStartMoving}
      onMouseMove={move}
      onWheel={this.zoom}
    >{this.props.children}</div>)
  }
}
