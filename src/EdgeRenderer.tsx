import React from 'react';
import { Edge } from './Edge'

interface IEdgeRendererProps {
  edge: Edge
  x1:number
  y1:number
  x2:number
  y2:number
}
export function EdgeRenderer(props:IEdgeRendererProps){
  const {edge, ...coordinates} = props;
  return <g stroke="green">
    <line
      {...coordinates}
    />
  </g>
}


