import React from 'react';
import { Edge } from './Edge'
import { getPositionByIndex } from './utils'
import { Vertex } from './Vertex'

interface IEdgeRendererProps {
  edge: Edge,
  vertices: Array<Vertex>
}
export const EdgeRenderer = React.memo(function EdgeRenderer(props:IEdgeRendererProps){
  const {edge} = props;
  const sourceCords = getPositionByIndex(props.vertices.findIndex(edge.source.equals))
  const targetCords = getPositionByIndex(props.vertices.findIndex(edge.target.equals))
  return <g stroke="green">
    <line
      x1={sourceCords.x}
      y1={sourceCords.y}
      x2={targetCords.x}
      y2={targetCords.y}
    />
  </g>
})


