import * as React from 'react'
import { DraggableCore, DraggableEvent, DraggableData } from 'react-draggable';
import { Point } from '../Point'
import { Vertex } from '../Vertex'
import { Viewport } from '../Viewport';
import { LabelRenderer } from './LabelRenderer';

interface IVertexRendererProps {
  vertex: Vertex
  viewport: Viewport
  selected: boolean
  selectVertex: (vertex: Vertex, additional?: boolean) => any
  dragSelection: (offset: Point) => any
  dropSelection: () => any
}

let stringToColour = function(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

export class VertexRenderer extends React.PureComponent<IVertexRendererProps> {

  constructor(props: Readonly<IVertexRendererProps>) {
    super(props)
    this.onPanStart = this.onPanStart.bind(this)
    this.onPanMove = this.onPanMove.bind(this)
    this.onPanEnd = this.onPanEnd.bind(this)
  }

  private onPanMove(e: DraggableEvent, data: DraggableData) {
    const { vertex, viewport } = this.props
    const current = viewport.applyMatrix(data.x, data.y)
    const last = viewport.applyMatrix(data.lastX, data.lastY)
    const offset = viewport.pixelToGrid(current.subtract(last))
    if (offset.x || offset.y) {
      this.props.dragSelection(offset)
    }
  }

  onPanEnd(e: DraggableEvent, data: DraggableData) {
    this.props.dropSelection()
  }

  onPanStart(e: DraggableEvent, data: DraggableData) {
    const { vertex, selectVertex } = this.props
    selectVertex(vertex, e.shiftKey)
  }

  render() {
    const { vertex, viewport, selected } = this.props
    if (vertex.hidden) {
      return null;
    }
    const { x, y } = viewport.gridToPixel(vertex.position)
    const translate = `translate(${x} ${y})`
    const labelPosition = new Point(0, viewport.gridUnit)
    const color = selected ? 'red' : stringToColour(vertex.type);
    return (
      <DraggableCore
        handle='.handle'
        onStart={this.onPanStart}
        onDrag={this.onPanMove}
        onStop={this.onPanEnd} >
        <g className="vertex" transform={translate}>
          <circle className="handle" r={viewport.gridUnit * Vertex.RADIUS} fill={color} />
          <LabelRenderer center={labelPosition} label={vertex.label} />
        </g>
      </DraggableCore>
    );
  }
}
