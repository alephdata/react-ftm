import React from 'react'
import { Graph } from './Graph'
import { VertexRenderer } from './VertexRenderer'
import { EdgeRenderer } from './EdgeRenderer'
import { getPositionByIndex } from './utils'

interface ILayoutProps {
  graph: Graph
}

export function Layout(props: ILayoutProps){
  const scale = 500;
  const UNIT = 10;

  return (<svg viewBox={`${scale  * -.75 } ${scale  * -.33} ${scale * 1.5} ${scale / 1.5}`}>
    <defs>
      <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.5"/>
      </pattern>
      <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="url(#smallGrid)"/>
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
    <g>
      {props.graph.edges
        .map(edge =>  {
          return <EdgeRenderer
            key={edge.id}
            edge={edge}
            vertices={props.graph.vertices}
          />})}
    </g>
    <g>
      {props.graph.vertices.map((vertex, i) =>  <VertexRenderer
        key={vertex.id}
        vertex={vertex}
        index={i}
      />)}
    </g>
  </svg>)
}
