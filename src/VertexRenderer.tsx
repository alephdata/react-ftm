import React from 'react';
import { Vertex } from './Vertex'

interface IVertexRendererProps{
  vertex: Vertex
  x: number
  y: number
}

export function VertexRenderer(props:IVertexRendererProps){
  return <g>
    <circle
      cx={props.x}
      cy={props.y}
      r={5}
      fill="red"
    />
  </g>
}
