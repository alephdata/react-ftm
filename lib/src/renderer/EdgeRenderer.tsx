import * as React from 'react'
import { Colors } from '@blueprintjs/core';
import { GraphConfig } from '../GraphConfig';
import { Edge } from '../layout/Edge'
import { Viewport } from '../layout/Viewport';
import { Vertex } from '../layout/Vertex';
import { Rectangle } from '../layout/Rectangle'
import { LabelRenderer } from './LabelRenderer';


interface IEdgeRendererProps {
  edge: Edge,
  config: GraphConfig,
  source?: Vertex,
  target?: Vertex
  shouldBeHighlighted: boolean
}

export class EdgeRenderer extends React.PureComponent<IEdgeRendererProps>{
  render(){
    const { edge, source, target, config, shouldBeHighlighted } = this.props;
    if (!source || !target || source.hidden || target.hidden) {
      return null;
    }
    const sourcePosition = config.gridToPixel(source.position)
    const targetPosition = config.gridToPixel(target.position)
    const center = Rectangle.fromPoints(sourcePosition, targetPosition).getCenter()
    return <g className="edge">
      <line
        stroke={shouldBeHighlighted ? config.selectedColor :Colors.GRAY2}
        strokeWidth={shouldBeHighlighted ? 2 : 'inherit'}
        x1={sourcePosition.x}
        y1={sourcePosition.y}
        x2={targetPosition.x}
        y2={targetPosition.y}
      />
      <LabelRenderer center={center} label={edge.label} />
    </g>
  }
}


