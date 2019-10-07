import * as React from 'react'
import { DraggableCore, DraggableEvent, DraggableData } from 'react-draggable';
import { GraphConfig } from '../GraphConfig';
import { GraphElement, Grouping, Point, Rectangle, Vertex } from '../layout'
import { getRefMatrix, applyMatrix } from './utils';

interface IGroupingRendererProps {
  grouping: Grouping
  config: GraphConfig
  vertices: Vertex[]
  selected: boolean
  selectGrouping: (element: Array<GraphElement>, additional?: boolean) => any
  dragSelection: (offset: Point) => any
  dropSelection: () => any
}

export class GroupingRenderer extends React.PureComponent<IGroupingRendererProps> {
  gRef: React.RefObject<SVGGElement>

  constructor(props: Readonly<IGroupingRendererProps>) {
    super(props)

    this.onDragStart = this.onDragStart.bind(this)
    this.onDragMove = this.onDragMove.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onClick = this.onClick.bind(this)
    this.gRef = React.createRef()
  }

  private onDragMove(e: DraggableEvent, data: DraggableData) {
    const { config } = this.props
    const matrix = getRefMatrix(this.gRef)
    const current = applyMatrix(matrix, data.x, data.y)
    const last = applyMatrix(matrix, data.lastX, data.lastY)
    const offset = config.pixelToGrid(current.subtract(last))
    if (offset.x || offset.y) {
      this.props.dragSelection(offset)
    }
  }

  onDragEnd(e: DraggableEvent, data: DraggableData) {
    this.props.dropSelection()
  }

  onDragStart(e: DraggableEvent, data: DraggableData) {
    this.onClick()
  }

  onClick() {
    const { vertices } = this.props
    console.log('clicked grouping');
    this.props.selectGrouping(vertices, true);
  }

  getBoundingRect() {
    const { config, vertices } = this.props

    const points = vertices.map((v) => config.gridToPixel(v.position))
    return Rectangle.fromPoints(...points)
  }

  render() {
    const { config, grouping, selected } = this.props

    const {x, y, width, height} = this.getBoundingRect();
    const padding = config.VERTEX_RADIUS*config.gridUnit + 8;

    const groupStyles: React.CSSProperties = {
      cursor: selected ? 'grab' : 'pointer',
    }

    return (
      <DraggableCore
        handle='.grouping-handle'
        onStart={this.onDragStart}
        onDrag={this.onDragMove}
        onStop={this.onDragEnd} >
        <g className="grouping-handle" style={groupStyles} ref={this.gRef} >
          <rect
            x={x - padding}
            y={y - padding}
            rx="5"
            width={width + padding*2}
            height={height + padding*2}
            fill={selected ? grouping.color : config.UNSELECTED_COLOR}
            fillOpacity={selected ? ".1" : ".2"}
          />
          <text
            x={x + width + padding - 5}
            y={y + height + padding - 5}
            fill={selected ? grouping.color : config.UNSELECTED_COLOR}
            textAnchor="end"
            fontSize="8"
          >
            {grouping.label}
          </text>
        </g>
      </DraggableCore>
    );
  }
}
