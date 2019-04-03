import React from 'react'
import { Graph } from './Graph'
import { VertexRenderer } from './VertexRenderer'
import { EdgeRenderer } from './EdgeRenderer'
import { getPositionByIndex } from './utils'

interface ILayoutProps {
  graph: Graph
}

export function Layout(props: ILayoutProps){
  const UNIT = 5;
  const RATIO = 1.4;
  const scale = UNIT * 1e2;
  const height = scale * RATIO;
  const width = scale / RATIO;

  return (<svg viewBox={`${-(height/2) } ${-(width/2)} ${height} ${width}`} fill="url(#grid)" style={{
    backgroundSize:`${UNIT}% ${UNIT*(Math.pow(RATIO,2)) }%`,
    backgroundImage: 'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)'
  }}>

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
