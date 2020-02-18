import * as React from 'react'
import { DraggableCore, DraggableEvent, DraggableData } from 'react-draggable';
import { Colors } from '@blueprintjs/core';
import { GraphConfig } from '../GraphConfig';
import { Point } from '../layout/Point'
import { Vertex } from '../layout/Vertex'
import { getRefMatrix, applyMatrix } from './utils';
import { VertexLabelRenderer } from './VertexLabelRenderer';
import {IconRenderer} from "./IconRenderer";
import { modes } from '../interactionModes'


interface IVertexRendererProps {
  vertex: Vertex
  config: GraphConfig
  selected: boolean
  highlighted: boolean
  selectVertex: (vertex: Vertex, additional?: boolean) => any
  dragSelection: (offset: Point) => any
  dropSelection: () => any
  interactionMode: string
  actions: any
  writeable: boolean
}

interface IVertexRendererState {
  hovered: boolean
}

export class VertexRenderer extends React.PureComponent<IVertexRendererProps, IVertexRendererState> {
  gRef: React.RefObject<SVGGElement>

  constructor(props: Readonly<IVertexRendererProps>) {
    super(props)

    this.state = { hovered: false }
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragMove = this.onDragMove.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onDoubleClick = this.onDoubleClick.bind(this)
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
    this.gRef = React.createRef()
  }

  componentDidMount() {
    const { writeable } = this.props;
    const g = this.gRef.current;
    if (writeable && g !== null) {
      g.addEventListener('dblclick', this.onDoubleClick)
    }
  }

  componentWillUnmount() {
    const { writeable } = this.props;
    const g = this.gRef.current;
    if (writeable && g !== null) {
      g.removeEventListener('dblclick', this.onDoubleClick)
    }
  }

  private onDragMove(e: DraggableEvent, data: DraggableData) {
    const { config } = this.props
    const matrix = getRefMatrix(this.gRef)
    const current = applyMatrix(matrix, data.x, data.y)
    const last = applyMatrix(matrix, data.lastX, data.lastY)
    const offset = config.pixelToGrid(current.subtract(last))
    this.props.actions.setInteractionMode(modes.ITEM_DRAG)

    if (offset.x || offset.y) {
      this.props.dragSelection(offset)
    }
  }

  onDragEnd(e: DraggableEvent, data: DraggableData) {
    const { interactionMode, actions, dropSelection } = this.props;
    if (interactionMode === modes.ITEM_DRAG) {
      actions.setInteractionMode(modes.SELECT)
    }
    dropSelection()
  }

  onDragStart(e: DraggableEvent, data: DraggableData) {
    this.onClick(e)
  }

  onClick(e: any) {
    const { vertex, selected, selectVertex, interactionMode, actions } = this.props
    if (interactionMode === modes.EDGE_DRAW) {
      // can't draw link to self
      if (selected) {
        actions.setInteractionMode(modes.SELECT)
        return
      } else {
        selectVertex(vertex, true)
        actions.setInteractionMode(modes.EDGE_CREATE)
        return
      }
    }
    selectVertex(vertex, e.shiftKey)
  }

  onDoubleClick(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    this.props.actions.setInteractionMode(modes.EDGE_DRAW)
  }

  onMouseOver() {
    this.props.interactionMode === modes.EDGE_DRAW && this.setState({hovered: true})
  }

  onMouseOut() {
    this.setState({hovered: false})
  }

  getColor() {
    const { vertex, config, highlighted } = this.props
    const { hovered } = this.state

    if (highlighted || hovered) {
      return vertex.color || config.DEFAULT_VERTEX_COLOR
    } else {
      return config.UNSELECTED_COLOR
    }
  }

  render() {
    const { vertex, config, selected, highlighted, interactionMode, writeable } = this.props
    const { x, y } = config.gridToPixel(vertex.position)
    const isEntity = vertex.isEntity()
    const vertexRadius = isEntity ? config.gridUnit * config.VERTEX_BASE_RADIUS : config.gridUnit * config.VERTEX_BASE_RADIUS / 2
    const translate = `translate(${x} ${y})`
    const labelPosition = new Point(0, vertexRadius + config.gridUnit/2)

    const vertexColor = this.getColor()
    const groupStyles: React.CSSProperties = {
      cursor: selected && writeable ? 'grab' : 'pointer',
      // sets pointer events to none while dragging in order to detect mouseover on other elements
      pointerEvents: interactionMode === modes.ITEM_DRAG ? 'none' : 'auto'
    }

    return (
      <DraggableCore
        handle='.handle'
        onStart={this.onDragStart}
        onDrag={writeable ? this.onDragMove : undefined}
        onStop={writeable ? this.onDragEnd : undefined}
        enableUserSelectHack={false} >
        <g className='vertex' transform={translate} ref={this.gRef} style={groupStyles}>
          <circle
            className="handle"
            r={vertexRadius}
            fill={isEntity ? vertexColor : 'white'}
            stroke={isEntity ? 'none' : vertexColor}
            onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}
            />
          <VertexLabelRenderer center={labelPosition} label={vertex.label} type={vertex.type} onClick={this.onClick} color={vertexColor}/>
          <IconRenderer vertex={vertex}/>
        </g>
      </DraggableCore>
    );
  }
}
