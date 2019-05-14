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
    const center = config.gridToPixel(edge.getCenter())
    return <g className="edge">
      { selected && (
        <line
          stroke={config.selectedColor}
          strokeWidth='2'
          x1={sourcePosition.x}
          y1={sourcePosition.y}
          x2={targetPosition.x}
          y2={targetPosition.y}
        />
      )}
      <line
        stroke={Colors.GRAY2}
        strokeWidth='inherit'
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


