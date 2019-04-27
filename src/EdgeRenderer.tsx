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
    const sourceCenter = viewport.gridToPixel(source.point);
    const targetCenter = viewport.gridToPixel(target.point);
    return <g stroke="green">
      <line
        x1={sourceCenter.x}
        y1={sourceCenter.y}
        x2={targetCenter.x}
        y2={targetCenter.y}
      />
    </g>
  }
}


