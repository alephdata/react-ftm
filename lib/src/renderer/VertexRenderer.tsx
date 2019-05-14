import * as React from 'react'
import { DraggableCore, DraggableEvent, DraggableData } from 'react-draggable';
import { GraphConfig } from '../GraphConfig';
import { Point } from '../layout/Point'
import { Vertex } from '../layout/Vertex'
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
    this.onClick = this.onClick.bind(this)
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
    this.onClick(e)
  }

  onClick(e: any) {
    const { vertex, selectVertex } = this.props
    selectVertex(vertex, e.shiftKey)
  }

  render() {
    const { vertex, config, selected } = this.props
    const { x, y } = config.gridToPixel(vertex.position)
    const translate = `translate(${x} ${y})`
    const labelPosition = new Point(0, config.VERTEX_RADIUS * config.gridUnit)
    const groupStyles: React.CSSProperties = {
      cursor: selected ? 'grab' : 'pointer'
    }

    return (
      <DraggableCore
        handle='.handle'
        onStart={this.onPanStart}
        onDrag={this.onPanMove}
        onStop={this.onPanEnd} >
        <g className="vertex" transform={translate} ref={this.gRef} style={groupStyles}>
          { selected && (
            <circle r={(config.gridUnit * config.VERTEX_RADIUS) + 2} fill={config.SELECTED_COLOR} />
          )}
          <circle className="handle" r={config.gridUnit * config.VERTEX_RADIUS} fill={config.VERTEX_COLOR} />
          <LabelRenderer center={labelPosition} label={vertex.label} onClick={this.onClick} />
          <IconRenderer vertex={vertex}/>
        </g>
      </DraggableCore>
    );
  }
}
