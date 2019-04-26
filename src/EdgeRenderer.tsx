import React from 'react';
import { Edge } from './Edge'
import { Viewport } from './Viewport';

interface IEdgeRendererProps {
  edge: Edge,
  viewport: Viewport
}

export class EdgeRenderer extends React.Component<IEdgeRendererProps>{
  render(){
    const { edge, viewport } = this.props;
    const sourceCenter = viewport.gridToPixel(edge.source.point);
    const targetCenter = viewport.gridToPixel(edge.target.point);
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


