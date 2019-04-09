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
  const scale = UNIT * 150;
  const height = scale * RATIO;
  const width = scale / RATIO;

  return (<svg viewBox={`${-(height/2) } ${-(width/2)} ${height} ${width}`} fill="url(#grid)" style={{
    backgroundSize:`${UNIT}% ${UNIT*(Math.pow(RATIO,2)) }%`,
    backgroundImage: 'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)'
  }}>

    <g stroke="green">
      {Array.from(props.graph.edges.values())
        .map(edge =>  {
          return <EdgeRenderer
            key={edge.id}
            edge={edge}
          />})}
    </g>
    <g fill="red">
      {Array.from(props.graph.vertices.values())
        .map((vertex, i) =>  <VertexRenderer
        key={vertex.id}
        vertex={vertex}
        index={i}
      />)}
    </g>
  </svg>)
}
