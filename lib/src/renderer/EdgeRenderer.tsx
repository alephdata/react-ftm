import * as React from 'react'
import { Colors } from '@blueprintjs/core';
import { GraphConfig } from '../GraphConfig';
import { Edge } from '../layout/Edge'
import { Vertex } from '../layout/Vertex';
import { Rectangle } from '../layout/Rectangle'
import { LabelRenderer } from './LabelRenderer';


interface IEdgeRendererProps {
  edge: Edge,
  config: GraphConfig,
  source?: Vertex,
  target?: Vertex
  selected: boolean
}

export class EdgeRenderer extends React.PureComponent<IEdgeRendererProps>{
  render(){
    const { edge, source, target, config, selected } = this.props;
    if (!source || !target || source.hidden || target.hidden) {
      return null;
    }
    const sourcePosition = config.gridToPixel(source.position)
    const targetPosition = config.gridToPixel(target.position)
    const center = Rectangle.fromPoints(sourcePosition, targetPosition).getCenter()
    return <g className="edge">
      <line
        stroke={selected ? config.selectedColor : Colors.GRAY2}
        strokeWidth={selected ? 2 : 'inherit'}
        x1={sourcePosition.x}
        y1={sourcePosition.y}
        x2={targetPosition.x}
        y2={targetPosition.y}
      />
      { selected && (
        <LabelRenderer center={center} label={edge.label} />
      )}
    </g>
  }
}


