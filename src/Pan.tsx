import React, { MouseEvent } from 'react'
import { ICoordinates, Point } from './Point'
import { IViewport } from './Viewport'

interface IPanProps extends IViewport {
  onZoomChanged: (z:Point, zoomFactor: number) => any,
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
      * (((e.movementX / bBox.width) * 100) / 100) * (this.props.zoomFactor * this.props.RATIO)
      * (((e.movementY / bBox.height) * 100) / 100) * ((this.props.zoomFactor) / this.props.RATIO),
      * */
      this.props.onPanChanged(
        this.getPixelInUnits(
          Point.from(e.movementX, e.movementY),
          e.currentTarget.getBoundingClientRect()
        )
          .addition(this.props.panCenter)
      )
    }
  }

  getPixelInUnits(pixelPoint: Point, rect: ClientRect, viewPort: IViewport = this.props): Point {
    const { zoomFactor, RATIO } = viewPort
    return pixelPoint.divide({
      x: (rect.width / (zoomFactor / RATIO)),
      y: (rect.height / (zoomFactor * RATIO))
    })
  }

  private __zoom(event: MouseEvent) {
    // TODO: according to docs `event.deltaY` is not stable, but it works fine so i've tested so far, consider using scroll events if anybody will experience improper behaviour
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
    // console.log({...event}, event.currentTarget.getBoundingClientRect());
    // @ts-ignore
    let zoomFactor = this.props.zoomFactor + ((event.deltaY / this.props.UNIT))

    if (zoomFactor !== 0 && (zoomFactor !== this.props.zoomFactor)) {
      const clientRect = event.currentTarget.getBoundingClientRect()
      const internalPosition = Point.from(
        event.clientX - clientRect.left,
        event.clientY - clientRect.top
      )
      const inUnitsFromLeftTop = this.getPixelInUnits(internalPosition, clientRect)
      const viewport = this.props.panCenter.addition(Point.from(
        this.props.zoomFactor / this.props.RATIO,
        this.props.zoomFactor * this.props.RATIO
      ).divide(Point.from(2))).multiply(Point.from(-1))
      const newViewport = this.props.panCenter.addition(Point.from(
        zoomFactor / this.props.RATIO,
        zoomFactor * this.props.RATIO
      ).divide(Point.from(2))).multiply(Point.from(-1))
      const pointerPosition = inUnitsFromLeftTop.addition(viewport);
      const pointerPositionInNewZoom = inUnitsFromLeftTop.addition(newViewport)
      const pointerTo = pointerPosition.addition(viewport)
      const newPan = pointerTo.subtract(
        pointerPositionInNewZoom
      ).multiply(Point.from(-1))
      // const w = (this.props.zoomFactor / this.props.RATIO) + this.props.panCenter.x;

      console.log(newPan);
      this.props.onPanChanged(
        pointerPositionInNewZoom.subtract(pointerPosition.subtract(viewport))
      )
      // console.log(viewport, fromCenter)
      // debugger
      // @ts-ignore
      this.props.onZoomChanged(zoomFactor)
      // const fromCenterNew = this.getPixelInUnits(internalPosition, clientRect, {
      //   zoomFactor: zoomFactor || this.props.zoomFactor,
      //   RATIO: this.props.RATIO
      // } as IViewport)// .subtract(this.props.panCenter)
      // console.log(fromCenter, fromCenterNew, fromCenter.subtract(fromCenterNew).multiply(Point.)))

      console.log(newPan)

    }
  }
  private ___zoom(event: MouseEvent) {
    // TODO: according to docs `event.deltaY` is not stable, but it works fine so i've tested so far, consider using scroll events if anybody will experience improper behaviour
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
    // console.log({...event}, event.currentTarget.getBoundingClientRect());
    // @ts-ignore
    const zoomChange = event.deltaY < 0 ? -1 : 1;
    let zoomFactor = this.props.zoomFactor + zoomChange

    if (zoomFactor !== 0 && (zoomFactor !== this.props.zoomFactor)) {
      const clientRect = event.currentTarget.getBoundingClientRect()
      const internalPosition = Point.from(
        event.clientX - clientRect.left,
        event.clientY - clientRect.top
      )
      const inUnitsFromLeftTop = this.getPixelInUnits(internalPosition, clientRect);
      const viewport = this.props.panCenter.addition(Point.from(
        this.props.zoomFactor / this.props.RATIO,
        this.props.zoomFactor * this.props.RATIO
      ).divide(Point.from(2))).multiply(Point.from(-1))
      const newViewport = this.props.panCenter.addition(Point.from(
        zoomFactor / this.props.RATIO,
        zoomFactor * this.props.RATIO
      ).divide(Point.from(2))).multiply(Point.from(-1))
      const pointerPosition = inUnitsFromLeftTop.addition(viewport);
      console.log(pointerPosition)
      const differenceForPanCenter = pointerPosition
        .multiply(Point.from(-zoomChange))

      // new pan =  mousex/(scale*zoom) - mousex/scale;
      const nextinUnitsFromLeftTop = this.getPixelInUnits(internalPosition, clientRect, {
        ...this.props,
        zoomFactor,
      })
      const newPan = nextinUnitsFromLeftTop.subtract(inUnitsFromLeftTop)



      this.props.onZoomChanged(
        this.props.panCenter
          .addition(differenceForPanCenter),
        zoomFactor
      );
    }
  }
  private zoom(event: MouseEvent) {
    // @ts-ignore
    const zoomChange = event.deltaY < 0 ? -1 : 1;
    let zoomFactor = this.props.zoomFactor + zoomChange
    const zoomDelta = this.props.zoomFactor / zoomFactor;
    if (zoomFactor !== 0 && (zoomFactor !== this.props.zoomFactor)) {
      const clientRect = event.currentTarget.getBoundingClientRect();

      const internalPosition = Point.from(
        event.clientX - clientRect.left,
        event.clientY - clientRect.top
      )
      const previousMousePositionFromLeft = this.getPixelInUnits(internalPosition, clientRect);
      // const previousMousePosition = previousMousePositionFromLeft.addition(Point.from(
      //   this.props.zoomFactor / this.props.RATIO,
      //   this.props.zoomFactor * this.props.RATIO
      // ).divide(Point.from(2))).multiply(Point.from(-1))

      const widthInUnits = this.props.zoomFactor * this.props.RATIO;
      const heightInUnits = this.props.zoomFactor / this.props.RATIO;
      const previousMousePosition = {
        x: previousMousePositionFromLeft.x - (widthInUnits / 2),
        y: previousMousePositionFromLeft.y - (heightInUnits / 2)
      }
      console.log(previousMousePosition)
      // const newMousePosition = previousMousePosition/(this.props.zoomFactor/zoomFactor)
      const newMousePosition = {
        x:previousMousePosition.x/(this.props.zoomFactor/zoomFactor),
        y:previousMousePosition.y/(this.props.zoomFactor/zoomFactor)
      }
      const oldPan = this.props.panCenter;
      // const newPan = oldPan - (previousMousePosition - newMousePosition)
      const newPan = {
        x: oldPan.x - (previousMousePosition.x - newMousePosition.x),
        y: oldPan.y - (previousMousePosition.y - newMousePosition.y),
      }
      this.props.onZoomChanged(
        new Point(newPan),
        zoomFactor
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
