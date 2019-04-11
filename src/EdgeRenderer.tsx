import React from 'react';
import { Edge } from './Edge'

interface IEdgeRendererProps {
  edge: Edge,
}
export function EdgeRenderer(props:IEdgeRendererProps){
  const {edge} = props;
  const sourceCords = edge.source.point;
  const targetCords = edge.target.point;
  return <g>
    <line
      x1={sourceCords.x}
      y1={sourceCords.y}
      x2={targetCords.x}
      y2={targetCords.y}
    />
  </g>
}


