import React from 'react';
import { Vertex } from './Vertex'
import { getPositionByIndex } from './utils'

interface IVertexRendererProps{
  vertex: Vertex
  index:number
}

export function VertexRenderer(props:IVertexRendererProps){
  const {x, y} = getPositionByIndex(props.index);
  return <g>
    <circle
      cx={x}
      cy={y}
      r={5}
    />
  </g>
}
