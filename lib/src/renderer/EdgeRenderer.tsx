import * as React from 'react'
import { Edge } from '../layout/Edge'
import { Viewport } from '../layout/Viewport';
import { Vertex } from '../layout/Vertex';
import { Rectangle } from '../layout/Rectangle'
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
    const center = Rectangle.fromPoints(sourcePosition, targetPosition).getCenter()
    return <g className="edge">
      <line
        fill="#666666"
        x1={sourcePosition.x}
        y1={sourcePosition.y}
        x2={targetPosition.x}
        y2={targetPosition.y}
      />
      <LabelRenderer center={center} label={edge.label} />
    </g>
  }
}


