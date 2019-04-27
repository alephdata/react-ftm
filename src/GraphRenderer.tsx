import React from 'react'
import { GraphLayout, GraphUpdateHandler } from './GraphLayout'
import { Canvas } from './Canvas'
import { EdgeRenderer } from './EdgeRenderer'
import { VertexRenderer } from './VertexRenderer'
import { Viewport } from './Viewport';
import { Vertex } from './Vertex';

export interface IGraphRendererProps {
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler
}

export class GraphRenderer extends React.Component<IGraphRendererProps> {
  constructor(props: any) {
    super(props)
    this.updateViewport = this.updateViewport.bind(this);
    this.updateVertex = this.updateVertex.bind(this);
  }

  updateViewport(viewport: Viewport) {
    const { layout } = this.props;
    layout.viewport = viewport.clone()
    this.props.updateLayout(layout)
  }

  updateVertex(vertex: Vertex) {
    const { layout } = this.props;
    layout.vertices.set(vertex.id, vertex.clone())
    this.props.updateLayout(layout)
  }

  renderEdges() {
    const { layout } = this.props;
    const edges = Array.from(layout.edges.values());
    return edges.map((edge) =>
      <EdgeRenderer
        key={edge.id}
        viewport={layout.viewport}
        edge={edge}
        source={layout.vertices.get(edge.sourceId)}
        target={layout.vertices.get(edge.targetId)}
      />
    )
  }

  renderVertices() {
    const { layout } = this.props;
    const vertices = Array.from(layout.vertices.values());
    return vertices.map((vertex) =>
      <VertexRenderer
        key={vertex.id}
        viewport={layout.viewport}
        vertex={vertex}
        updateVertex={this.updateVertex}
      />
    )
  }

  render(){
    const { layout } = this.props;
    return (
      <Canvas viewport={layout.viewport} updateViewport={this.updateViewport}>
        {this.renderEdges()}
        {this.renderVertices()}
      </Canvas>
    );
  }
}
