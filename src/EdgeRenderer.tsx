import React from 'react';
import { Edge } from './Edge'
import { Viewport } from './Viewport';
import { Vertex } from './Vertex';


interface IEdgeRendererProps {
  edge: Edge,
  viewport: Viewport,
  source?: Vertex,
  target?: Vertex
}

export class EdgeRenderer extends React.PureComponent<IEdgeRendererProps>{
  render(){
    const { source, target, viewport } = this.props;
    if (!source || !target) {
      return null;
    }
    const sourcePosition = viewport.gridToPixel(source.position);
    const targetPosition = viewport.gridToPixel(target.position);
    return <g stroke="green">
      <line
        x1={sourcePosition.x}
        y1={sourcePosition.y}
        x2={targetPosition.x}
        y2={targetPosition.y}
      />
    </g>
  }
}


