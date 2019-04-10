import React from 'react'
import {Record} from 'immutable';
import { Graph, IGraphStorage } from './Graph'
import { VertexRenderer } from './VertexRenderer'
import { EdgeRenderer } from './EdgeRenderer'

interface ILayoutProps {
  graph: Graph
}
interface ILayoutState {
  graphStorage:Record<IGraphStorage>
}

export class Layout extends React.PureComponent<ILayoutProps, ILayoutState> {
  static getDerivedStateFromProps(props:ILayoutProps){
    return ({ graphStorage: props.graph.storage })
  }
  state = {
    graphStorage: Graph.StorageRecord()
  }
  componentDidMount(): void {
    this.props.graph.addEventListener((state:any) => {
      this.setState(state)
    });
  }

  render() {
    const UNIT = 5
    const RATIO = 1.4
    const scale = UNIT * 150
    const height = scale * RATIO
    const width = scale / RATIO
    const { edges, vertices } = this.state.graphStorage;
    return (<svg viewBox={`${-(height / 2)} ${-(width / 2)} ${height} ${width}`} fill="url(#grid)" style={{
      backgroundSize: `${UNIT}% ${UNIT * (Math.pow(RATIO, 2))}%`,
      backgroundImage: 'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)'
    }}>

      <g stroke="green">
        {edges.valueSeq().toArray()
          .map(edge => <EdgeRenderer
              key={edge.id}
              edge={edge}
            />
          )}
      </g>
      <g fill="red">
        {vertices.valueSeq().toArray()
          .map((vertex, i) => <VertexRenderer
            key={vertex.id}
            vertex={vertex}
            index={i}
          />)}
      </g>
    </svg>)
  }
}
