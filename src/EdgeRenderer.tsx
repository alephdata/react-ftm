import React from 'react';
import { Edge } from './Edge'

interface IEdgeRendererProps {
  edge: Edge,
  viewUnit:number
}
export class EdgeRenderer extends React.PureComponent<IEdgeRendererProps>{
  render(){
    const { edge, viewUnit } = this.props;
    const sourceCords = edge.source.point;
    const targetCords = edge.target.point;
    return <g>
      <line
        x1={sourceCords.x * viewUnit}
        y1={sourceCords.y * viewUnit}
        x2={targetCords.x * viewUnit}
        y2={targetCords.y * viewUnit}
      />
    </g>
  }
}


