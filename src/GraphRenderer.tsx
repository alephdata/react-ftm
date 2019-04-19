import React from 'react'
import { Graph, GraphUpdateHandler } from './Graph'
import { Canvas } from './Canvas'
import { EdgesRenderer } from './EdgesRenderer'
import { VerticesRenderer } from './VerticesRenderer'
import { Pan } from './Pan'
import { Viewport } from './Viewport';

export interface IGraphRendererProps {
  graph: Graph,
  updateGraph: GraphUpdateHandler
}

export class GraphRenderer extends React.Component<IGraphRendererProps> {
  constructor(props: any) {
    super(props)
    this.updateViewport = this.updateViewport.bind(this);
  }

  updateViewport(viewport: Viewport) {
    const { graph } = this.props;
    graph.viewport = viewport
    this.props.updateGraph(graph)
  }

  render(){
    const { graph } = this.props;
    const vertices = Array.from(graph.vertices.values())
    const edges =  Array.from(graph.edges.values())
    return (
      <Canvas viewport={graph.viewport} updateViewport={this.updateViewport}>
        <EdgesRenderer edges={edges} viewport={graph.viewport} />
        <VerticesRenderer vertices={vertices} viewport={graph.viewport} />
      </Canvas>
    );
  }
}
