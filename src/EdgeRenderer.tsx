import React from 'react';
import { Edge } from './Edge'
import { Viewport } from './Viewport';
import { Vertex } from './Vertex';
import { Point } from './Point'
import { LabelRenderer } from './LabelRenderer';


interface IEdgeRendererProps {
  edge: Edge,
  viewport: Viewport,
  source?: Vertex,
  target?: Vertex
}

export class EdgeRenderer extends React.PureComponent<IEdgeRendererProps>{
  render(){
    const { edge, source, target, viewport } = this.props;
    if (!source || !target || source.hidden || target.hidden) {
      return null;
    }
    const sourcePosition = viewport.gridToPixel(source.position)
    const targetPosition = viewport.gridToPixel(target.position)
    const minX = Math.min(targetPosition.x, sourcePosition.x)
    const minY = Math.min(targetPosition.y, sourcePosition.y)
    const maxX = Math.max(targetPosition.x, sourcePosition.x)
    const maxY = Math.max(targetPosition.y, sourcePosition.y)
    const labelPosition = new Point(
      minX + ((maxX - minX) / 2),
      minY + ((maxY - minY) / 2),
    )
    return <g className="edge">
      <line
        x1={sourcePosition.x}
        y1={sourcePosition.y}
        x2={targetPosition.x}
        y2={targetPosition.y}
      />
      <LabelRenderer center={labelPosition} label={edge.label} />
    </g>
  }
}


