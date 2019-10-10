import * as React from 'react'
import { DraggableCore, DraggableEvent, DraggableData } from 'react-draggable';
import { GraphConfig } from '../GraphConfig';
import { GraphElement, Grouping, Point, Rectangle, Vertex } from '../layout'
import { getRefMatrix, applyMatrix } from './utils';
import { modes } from '../interactionModes'

interface IGroupingRendererProps {
  grouping: Grouping
  config: GraphConfig
  vertices: Vertex[]
  selected: boolean
  selectGrouping: (element: Array<GraphElement>, additional?: boolean) => any
  dragSelection: (offset: Point) => any
  dropSelection: () => any
  interactionMode: string
}

interface IGroupingRendererState {
  hovered: boolean
}

export class GroupingRenderer extends React.PureComponent<IGroupingRendererProps, IGroupingRendererState> {
  gRef: React.RefObject<SVGGElement>

  constructor(props: Readonly<IGroupingRendererProps>) {
    super(props)

    this.state = { hovered: false }
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragMove = this.onDragMove.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
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
    this.onClick(e)
  }

  onClick(e: any) {
    const { vertices } = this.props
    this.props.selectGrouping(vertices, e.shiftKey);
  }

  onMouseOver() {
    // this.props.interactionMode === modes.ITEM_DRAG && this.setState({hovered: true})
  }

  onMouseOut() {
    // console.log('mouse out');
    // this.setState({hovered: false})
  }

  getBoundingRect() {
    const { config, vertices } = this.props

    const points = vertices.map((v) => config.gridToPixel(v.position))
    return Rectangle.fromPoints(...points)
  }

  render() {
    const { config, grouping, selected } = this.props
    const { hovered } = this.state

    const {x, y, width, height} = this.getBoundingRect();
    const padding = config.VERTEX_RADIUS*config.gridUnit + 12;

    const groupStyles: React.CSSProperties = {
      cursor: selected ? 'grab' : 'pointer',
    }
    const textStyle: React.CSSProperties = {
      fontSize: "5px",
      fontFamily: "sans-serif",
      fontWeight: "bold"
    }
    const displayColor = selected || hovered ? grouping.color : config.UNSELECTED_COLOR

    return (
      <DraggableCore
        handle='.grouping-handle'
        onStart={this.onDragStart}
        onDrag={this.onDragMove}
        onStop={this.onDragEnd} >
        <g
          className="grouping-handle"
          style={groupStyles}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          ref={this.gRef} >
          <rect
            x={x - padding}
            y={y - padding}
            rx="5"
            width={width + padding*2}
            height={height + padding*2}
            fill={displayColor}
            fillOpacity={selected ? ".1" : ".2"}
          />
          <text
            x={x + width/2}
            y={y + height + padding + 10}
            fill={displayColor}
            textAnchor="middle"
            style={textStyle}
          >
            {grouping.label}
          </text>
        </g>
      </DraggableCore>
    );
  }
}
