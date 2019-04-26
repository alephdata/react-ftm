import React from 'react'
import { Graph, GraphUpdateHandler } from './Graph'
import { Canvas } from './Canvas'
import { EdgeRenderer } from './EdgeRenderer'
import { VertexRenderer } from './VertexRenderer'
import { Viewport } from './Viewport';
import { Vertex } from './Vertex';

export interface IGraphRendererProps {
  graph: Graph,
  updateGraph: GraphUpdateHandler
}

export class GraphRenderer extends React.Component<IGraphRendererProps> {
  constructor(props: any) {
    super(props)
    this.updateViewport = this.updateViewport.bind(this);
    this.updateVertex = this.updateVertex.bind(this);
  }

  updateViewport(viewport: Viewport) {
    const { graph } = this.props;
    graph.viewport = viewport
    this.props.updateGraph(graph)
  }

  updateVertex<V extends Vertex>(vertex: V) {
    const { graph } = this.props;
    graph.vertices.set(vertex.id, vertex)
    this.props.updateGraph(graph)
  }

  renderEdges() {
    const { graph } = this.props;
    const edges = Array.from(graph.edges.values());
    return edges.map((edge) =>
      <EdgeRenderer
        key={edge.id}
        viewport={graph.viewport}
        edge={edge}
      />
    )
  }

  renderVertices() {
    const { graph } = this.props;
    const vertices = Array.from(graph.vertices.values());
    return vertices.map((vertex) =>
      <VertexRenderer
        key={vertex.id}
        viewport={graph.viewport}
        vertex={vertex}
        updateVertex={this.updateVertex}
      />
    )
  }

  render(){
    const { graph } = this.props;
    return (
      <Canvas viewport={graph.viewport} updateViewport={this.updateViewport}>
        {this.renderEdges()}
        {this.renderVertices()}
      </Canvas>
    );
  }
}
