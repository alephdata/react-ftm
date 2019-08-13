import * as React from 'react'
import { Colors } from '@blueprintjs/core';
import { GraphConfig } from '../GraphConfig';
import { Edge } from '../layout/Edge'
import { Vertex } from '../layout/Vertex';
import { EdgeLabelRenderer } from './EdgeLabelRenderer';


interface IEdgeRendererProps {
  edge: Edge,
  config: GraphConfig,
  source?: Vertex,
  target?: Vertex
  highlight: boolean,
  selectEdge: (edge: Edge, additional?: boolean) => any
}

export class EdgeRenderer extends React.PureComponent<IEdgeRendererProps>{
  constructor(props: Readonly<IEdgeRendererProps>) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(e: React.MouseEvent) {
    const { edge, selectEdge } = this.props;
    selectEdge(edge, e.shiftKey)
    e.preventDefault()
    e.stopPropagation()
  }

  render() {
    const { edge, source, target, config, highlight } = this.props;
    if (!source || !target || source.hidden || target.hidden) {
      return null;
    }
    const sourcePosition = config.gridToPixel(source.position)
    const targetPosition = config.gridToPixel(target.position)
    const center = config.gridToPixel(edge.getCenter())
    const lineStyles: React.CSSProperties = {
      cursor: 'pointer'
    }
    return <g className="edge">
      <line
        stroke={config.SELECTED_COLOR}
        strokeWidth='2'
        strokeOpacity={highlight ? '1' : '0'}
        x1={sourcePosition.x}
        y1={sourcePosition.y}
        x2={targetPosition.x}
        y2={targetPosition.y}
        onClick={this.onClick}
        style={lineStyles}
      />
      <line
        stroke={Colors.GRAY2}
        strokeWidth='inherit'
        x1={sourcePosition.x}
        y1={sourcePosition.y}
        x2={targetPosition.x}
        y2={targetPosition.y}
        onClick={this.onClick}
        style={lineStyles}
      />
      { highlight && (
        <EdgeLabelRenderer center={center} labelText={edge.label} onClick={this.onClick} color={Colors.GRAY2}/>
      )}
    </g>
  }
}
