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
  selectVertex: (vertex: Vertex, additional?: boolean) => any
  dragSelection: (offset: Point) => any
  dropSelection: () => any
  interactionMode: string
  actions: any
}

interface IVertexRendererState {
  hovered: boolean
}

export class VertexRenderer extends React.PureComponent<IVertexRendererProps, IVertexRendererState> {
  gRef: React.RefObject<SVGGElement>

  constructor(props: Readonly<IVertexRendererProps>) {
    super(props)

    this.state = { hovered: false }
    this.onPanStart = this.onPanStart.bind(this)
    this.onPanMove = this.onPanMove.bind(this)
    this.onPanEnd = this.onPanEnd.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onDoubleClick = this.onDoubleClick.bind(this)
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
    this.gRef = React.createRef()
  }

  componentDidMount() {
    const g = this.gRef.current;
    if (g !== null) {
      g.addEventListener('dblclick', this.onDoubleClick)
    }
  }

  componentWillUnmount() {
    const g = this.gRef.current;
    if (g !== null) {
      g.removeEventListener('dblclick', this.onDoubleClick)
    }
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
    const { interactionMode, actions, dropSelection } = this.props;
    if (interactionMode === modes.ITEM_DRAG) {
      actions.setInteractionMode(modes.SELECT)
    }
    dropSelection()
  }

  onPanStart(e: DraggableEvent, data: DraggableData) {
    this.props.actions.setInteractionMode(modes.ITEM_DRAG)
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
    const { vertex, config, selected } = this.props
    const { hovered } = this.state

    if (selected || hovered) {
      return vertex.color || config.DEFAULT_VERTEX_COLOR
    } else {
      return config.UNSELECTED_COLOR
    }
  }

  render() {
    const { vertex, config, selected, interactionMode } = this.props
    const { x, y } = config.gridToPixel(vertex.position)
    const isEntity = vertex.isEntity()
    const vertexRadius = isEntity ? config.gridUnit * config.VERTEX_RADIUS : config.gridUnit * config.VERTEX_RADIUS / 2
    const translate = `translate(${x} ${y})`
    const labelPosition = new Point(0, vertexRadius + config.gridUnit/2)

    const vertexColor = this.getColor()
    const groupStyles: React.CSSProperties = {
      cursor: 'pointer'
      // sets pointer events to none while dragging in order to detect mouseover on other elements
      // pointerEvents: interactionMode === modes.ITEM_DRAG ? 'none' : 'auto'
    }

    return (
      <DraggableCore
        handle='.handle'
        onStart={this.onPanStart}
        onDrag={this.onPanMove}
        onStop={this.onPanEnd} >
        <g className='vertex' transform={translate} ref={this.gRef} style={groupStyles}>
          <circle
            className="handle"
            r={vertexRadius}
            fill={isEntity ? vertexColor : 'white'}
            stroke={isEntity ? 'none' : vertexColor}
            onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}
            />
          <VertexLabelRenderer center={labelPosition} label={vertex.label} onClick={this.onClick} color={vertexColor}/>
          <IconRenderer vertex={vertex}/>
        </g>
      </DraggableCore>
    );
  }
}
