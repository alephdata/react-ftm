import React from 'react'
import { Graph } from './Graph'
import { VertexRenderer } from './VertexRenderer'
import { EdgeRenderer } from './EdgeRenderer'

interface ILayoutProps {
  graph: Graph
}
interface ICoordinates {
  x:number
  y:number
}

function getPositionByIndex(index:number):ICoordinates{
  const RADIUS = 12;
  const ANGEL = Math.PI * (3 - Math.sqrt(5));
  const angelPer = ANGEL * index;
  const radiusPer = RADIUS * Math.sqrt(index)
  return {
    x:radiusPer * Math.cos(angelPer),
    y:radiusPer * Math.sin(angelPer)
  }
}

export function Layout(props: ILayoutProps){
  const scale = 500;
  const UNIT = 10;

  return (<svg viewBox={`${scale  * -.75 } ${scale  * -.33} ${scale * 1.5} ${scale / 1.5}`}>
    <g>
      {props.graph.edges
        .map(edge =>  {
          const sourceCords = getPositionByIndex(props.graph.vertices.findIndex(edge.source.equals))
          const targetCords = getPositionByIndex(props.graph.vertices.findIndex(edge.target.equals))
          return <EdgeRenderer
            key={edge.id}
            x1={sourceCords.x}
            y1={sourceCords.y}
            x2={targetCords.x}
            y2={targetCords.y}
            edge={edge}
        />})}
    </g>
    <g>
      {props.graph.vertices.map((vertex, i) =>  <VertexRenderer
        key={vertex.id}
        vertex={vertex}
        {...getPositionByIndex(i)}
      />)}
    </g>
  </svg>)
}
