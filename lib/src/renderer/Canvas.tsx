import * as React from 'react'
import * as ReactDOM from 'react-dom';
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
  tempDisableAnimation: boolean

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
    this.tempDisableAnimation = false
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
      const gridOffset = viewport.config.pixelToGrid(offset)
      const center = viewport.center.subtract(gridOffset)
      this.tempDisableAnimation = true
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
    this.tempDisableAnimation = true
    this.props.updateViewport(newViewport)
  }
  componentWillReceiveProps(nextProps: Readonly<ICanvasProps>): void {
    this.animationHandler(this.props.viewport.viewBox || '' , nextProps.viewport.viewBox || '');
  }

  animationHandler(oldViewBox:string, viewBox:string, userDuration?:number) {
    if (viewBox && oldViewBox && viewBox !== oldViewBox) {
      // should only animate on non-user initiated zoom and pan
      if (this.tempDisableAnimation) {
        this.tempDisableAnimation = false
      } else {
        this._animateTransition(oldViewBox, viewBox)
      }
    } else {
      // @ts-ignore
      ReactDOM.findDOMNode(this).setAttribute("viewBox", viewBox);
    }
  }

  _animateTransition(oldViewBox:string, viewBox:string, userDuration?:number) {
    let start = this._now();
    let that = this;
    let domNode = ReactDOM.findDOMNode(that);
    let req;

    let oldVb = oldViewBox.split(" ").map(n => parseInt(n, 10));
    let newVb = viewBox.split(" ").map(n => parseInt(n, 10));
    let duration:number = userDuration as number;
    // if duration not supplied, calculate based on change of size and center
    if (!userDuration) {
      let wRatio = newVb[2]/oldVb[2];
      let hRatio = newVb[3]/oldVb[3];
      let oldCenterX = oldVb[0] + oldVb[2]/2;
      let oldCenterY = oldVb[1] + oldVb[3]/2;
      let newCenterX = newVb[0] + newVb[2]/2;
      let newCenterY = newVb[1] + newVb[3]/2;
      let ratio = Math.max(wRatio, 1/wRatio, hRatio, 1/hRatio);
      let dist = Math.floor(Math.sqrt(Math.pow(newCenterX - oldCenterX, 2) + Math.pow(newCenterY - oldCenterY, 2)));
      duration = 1 - 1/(ratio + Math.log(dist + 1));
      duration = Math.max(0.4, duration);
    }
    const draw = () => {
      req = requestAnimationFrame(draw);

      let time = (that._now() - start);
      let vb = oldVb.map((part, i) => {
        return oldVb[i] + (newVb[i] - oldVb[i]) * (time / duration);
      }).join(" ");

      // @ts-ignore
      domNode && domNode.setAttribute("viewBox", vb);

      if (time > duration) {
        cancelAnimationFrame(req);
      }
    };

    requestAnimationFrame(draw);
  }

  _now() {
    return new Date().getTime() / 1000;
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
