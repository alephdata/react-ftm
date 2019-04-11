import React from 'react'
import { Graph, IGraphEvent } from './Graph'
import { VertexRenderer } from './VertexRenderer'
import { EdgeRenderer } from './EdgeRenderer'

interface ILayoutProps {
  graph: Graph
}
interface ILayoutState extends IGraphEvent{}

export class Layout extends React.PureComponent<ILayoutProps, ILayoutState> {
  state:ILayoutState = { vertices: [], edges: [] }

  componentDidMount(): void {
    this.props.graph.addEventListener(this.setState, this);
  }

  render() {
    const UNIT = 5
    const RATIO = 1.4
    const scale = UNIT * 150
    const height = scale * RATIO
    const width = scale / RATIO
    const { edges, vertices } = this.state;
    return (<svg viewBox={`${-(height / 2)} ${-(width / 2)} ${height} ${width}`} fill="url(#grid)" style={{
      backgroundSize: `${UNIT}% ${UNIT * (Math.pow(RATIO, 2))}%`,
      backgroundImage: 'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)'
    }}>

      <g stroke="green">
        {edges.map(edge => <EdgeRenderer
              key={edge.id}
              edge={edge}
            />
          )}
      </g>
      <g fill="red">
        {vertices.map(vertex => <VertexRenderer
          key={vertex.id}
          vertex={vertex}
        />)}
      </g>
    </svg>)
  }
  componentWillUnmount(): void {
    this.props.graph.removeEventListener(this.setState)
  }
}
