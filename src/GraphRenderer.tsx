import React from 'react'
import { Graph, GraphUpdateHandler, IGraphEvent } from './Graph'
import { Point } from './Point'
import { Canvas } from './Canvas'
import { EdgesRenderer } from './EdgesRenderer'
import { VerticesRenderer } from './VerticesRenderer'
import { Pan } from './Pan'

export interface IGraphRendererProps {
  graph: Graph,
  updateGraph: GraphUpdateHandler
}

export interface IGraphRendererState extends IGraphEvent{}

export class GraphRenderer extends React.Component<IGraphRendererProps, IGraphRendererState> {
  state: IGraphRendererState = {
    vertices: [],
    edges: [],
    zoomFactor: 1,
    panCenter: Point.from(0,0)
  }

  componentDidMount(): void {
    this.props.graph.addEventListener(this.setState, this);
  }

  render(){
    const { graph } = this.props;
    const { edges, vertices } = this.state;
    return <Pan
      viewport={graph.viewport}
      onZoomChanged={this.props.graph.setZoomFactor}
      onPanChanged={this.props.graph.setPanCenter}
    >
      <Canvas viewport={graph.viewport}>
        <EdgesRenderer edges={edges}/>
        <VerticesRenderer vertices={vertices}/>
      </Canvas>
    </Pan>
  }

  componentWillUnmount(): void {
    this.props.graph.removeEventListener(this.setState)
  }
}
