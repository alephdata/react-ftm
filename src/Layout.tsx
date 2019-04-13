import React from 'react'
import { Graph, IGraphEvent } from './Graph'
import { VertexRenderer } from './VertexRenderer'
import { EdgeRenderer } from './EdgeRenderer'

export interface ILayoutProps {
  graph: Graph
}
export interface ILayoutState extends IGraphEvent{}

export class Layout extends React.PureComponent<ILayoutProps, ILayoutState> {
  state:ILayoutState = {
    vertices: [],
    edges: [],
  }

  componentDidMount(): void {
    this.props.graph.addEventListener(this.setState, this);
  }

  render(){
    const {edges, vertices} = this.state;
    // TODO: Must do more rendering optimisation, to get immutable data from graph.addEventListener so CollectionRenderer  can be build
    return <React.Fragment>
      <g stroke="green">
        {edges.map(edge => <EdgeRenderer
            key={edge.id}
            viewUnit={5}
            edge={edge}
          />
        )}
      </g>
      <g fill="red">
        {vertices.map(vertex => <VertexRenderer
          key={vertex.id}
          viewUnit={5}
          vertex={vertex}
        />)}
      </g>
    </React.Fragment>
  }
  componentWillUnmount(): void {
    this.props.graph.removeEventListener(this.setState)
  }
}
