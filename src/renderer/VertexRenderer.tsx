import * as React from 'react'
import { DraggableCore, DraggableEvent, DraggableData } from 'react-draggable';
import { Colors } from '@blueprintjs/core';
import { GraphConfig } from '../GraphConfig';
import { GraphContext } from '../GraphContext';
import { Point } from '../layout/Point'
import { Vertex } from '../layout/Vertex'
import { getRefMatrix, applyMatrix } from './utils';
import { VertexLabelRenderer } from './VertexLabelRenderer';
import {IconRenderer} from "./IconRenderer";
import { modes } from '../utils/interactionModes'


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
  hasExpand: boolean
}

interface IVertexRendererState {
  hovered: boolean
}

export class VertexRenderer extends React.PureComponent<IVertexRendererProps, IVertexRendererState> {
  static contextType = GraphContext;
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
    const { writeable } = this.context;
    const g = this.gRef.current;
    if (writeable && g !== null) {
      g.addEventListener('dblclick', this.onDoubleClick)
    }
  }

  componentWillUnmount() {
    const { writeable } = this.context;
    const g = this.gRef.current;
    if (writeable && g !== null) {
      g.removeEventListener('dblclick', this.onDoubleClick)
    }
  }

  private onDragMove(e: DraggableEvent, data: DraggableData) {
    const { actions, config, dragSelection, interactionMode } = this.props
    const matrix = getRefMatrix(this.gRef)
    const current = applyMatrix(matrix, data.x, data.y)
    const last = applyMatrix(matrix, data.lastX, data.lastY)
    const offset = config.pixelToGrid(current.subtract(last))
    if (interactionMode !== modes.ITEM_DRAG) {
      actions.setInteractionMode(modes.ITEM_DRAG)
    }

    if (offset.x || offset.y) {
      dragSelection(offset)
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
      } else if (vertex.isEntity()) {
        selectVertex(vertex, true)
        actions.setInteractionMode(modes.EDGE_CREATE)
        return
      }
    }
    selectVertex(vertex, e.shiftKey)
  }

  onDoubleClick(e: MouseEvent) {
    const { actions, hasExpand, vertex } = this.props;
    e.preventDefault()
    e.stopPropagation()
    if (vertex.isEntity()) {
      if (hasExpand) {
        actions.showVertexMenu(vertex, new Point(e.clientX, e.clientY));
      } else {
        actions.setInteractionMode(modes.EDGE_DRAW);
      }
    }
  }

  onMouseOver() {
    const { interactionMode, vertex } = this.props;

    if (interactionMode === modes.EDGE_DRAW && vertex.isEntity()) {
      this.setState({ hovered: true });
    }
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

  allowPointerEvents() {
    const { interactionMode, vertex } = this.props;

    // sets pointer events to none while dragging in order to detect mouseover on other elements
    if (interactionMode === modes.ITEM_DRAG) {
      return false;
    }
    // ensures non-entity vertices can't be selected when drawing edges
    if (interactionMode === modes.EDGE_DRAW && !vertex.isEntity()) {
      return false;
    }
    return true;
  }

  render() {
    const { entityManager, writeable } = this.context;
    const { vertex, config, selected, highlighted, interactionMode } = this.props
    const { x, y } = config.gridToPixel(vertex.position)
    const isEntity = vertex.isEntity()
    const defaultRadius = isEntity ? config.DEFAULT_VERTEX_RADIUS : config.DEFAULT_VERTEX_RADIUS/2;
    const vertexRadius = (vertex.radius || defaultRadius) * config.gridUnit
    const translate = `translate(${x} ${y})`
    const labelPosition = new Point(0, vertexRadius + config.gridUnit/2)

    const vertexColor = this.getColor()
    const groupStyles: React.CSSProperties = {
      cursor: selected && writeable ? 'grab' : 'pointer',
      pointerEvents: this.allowPointerEvents() ? 'auto' : 'none',
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
          <IconRenderer entity={entityManager.getEntity(vertex.entityId)} radius={vertexRadius}/>
        </g>
      </DraggableCore>
    );
  }
}
