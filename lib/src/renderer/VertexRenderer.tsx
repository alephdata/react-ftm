import * as React from 'react'
import { Colors } from '@blueprintjs/core';
import { DraggableCore, DraggableEvent, DraggableData } from 'react-draggable';
import { GraphConfig } from '../GraphConfig';
import { Point } from '../layout/Point'
import { Vertex } from '../layout/Vertex'
import { Viewport } from '../layout/Viewport';
import { getRefMatrix, applyMatrix } from './utils';
import { LabelRenderer } from './LabelRenderer';
import {IconRenderer} from "./IconRenderer";

interface IVertexRendererProps {
  vertex: Vertex
  config: GraphConfig
  selected: boolean
  selectVertex: (vertex: Vertex, additional?: boolean) => any
  dragSelection: (offset: Point) => any
  dropSelection: () => any
}

export class VertexRenderer extends React.PureComponent<IVertexRendererProps> {
  gRef: React.RefObject<SVGGElement>

  constructor(props: Readonly<IVertexRendererProps>) {
    super(props)
    this.onPanStart = this.onPanStart.bind(this)
    this.onPanMove = this.onPanMove.bind(this)
    this.onPanEnd = this.onPanEnd.bind(this)
    this.gRef = React.createRef()
  }

  private onPanMove(e: DraggableEvent, data: DraggableData) {
    const { config } = this.props
    const matrix = getRefMatrix(this.gRef)
    const current = applyMatrix(matrix, data.x, data.y)
    const last = applyMatrix(matrix, data.lastX, data.lastY)
    const offset = config.pixelToGrid(current.subtract(last))
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
    const { vertex, config, selected } = this.props
    if (vertex.hidden) {
      return null;
    }
    const { x, y } = config.gridToPixel(vertex.position)
    const translate = `translate(${x} ${y})`
    const labelPosition = new Point(0, config.VERTEX_RADIUS * config.gridUnit)
    const stroke = this.props.selected ? config.SELECTED_COLOR : 'initial';
    const groupStyles:React.CSSProperties = {
      cursor: selected ? 'grab' : 'pointer'
    }
    return (
      <DraggableCore
        handle='.handle'
        onStart={this.onPanStart}
        onDrag={this.onPanMove}
        onStop={this.onPanEnd} >
        <g className="vertex" transform={translate} ref={this.gRef} style={groupStyles}>
          <circle className="handle" r={config.gridUnit * config.VERTEX_RADIUS} fill={config.VERTEX_COLOR} stroke={stroke} />
          <LabelRenderer center={labelPosition} label={vertex.label} />
          <IconRenderer vertex={vertex}/>
        </g>
      </DraggableCore>
    );
  }
}
