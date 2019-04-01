import React from 'react'
import { Graph } from './Graph'
import { VertexRenderer } from './VertexRenderer'
import { EdgeRenderer } from './EdgeRenderer'

interface ILayoutProps {
  graph: Graph
}

export function Layout(props: ILayoutProps){
  return (<svg>
    <g>
      {props.graph.vertices.map((vertex, i) =>  <VertexRenderer
        key={vertex.id}
        vertex={vertex}
        x={10*i+12}
        y={10*i+12}
      />)}
    </g>
    <g>
      {props.graph.edges
        .map(edge =>  <EdgeRenderer
          key={edge.id}
          edge={edge}
        />)}
    </g>
  </svg>)
}
