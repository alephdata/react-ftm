import React from 'react'
import { Graph, IGraphEvent } from './Graph'
import { Point } from './Point'
import { Viewport } from './Viewport'
import { EdgesRenderer } from './EdgesRenderer'
import { VerticesRenderer } from './VerticesRenderer'
import { Pan } from './Pan'

export interface IGraphRendererProps {
  graph: Graph
}

export interface IGraphRendererState extends IGraphEvent{}

export class GraphRenderer extends React.PureComponent<IGraphRendererProps, IGraphRendererState> {
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
    const UNIT = 5;
    const RATIO = 1;
    const {edges, vertices} = this.state;
    return <Pan
      UNIT={UNIT}
      RATIO={RATIO}
      zoomFactor={this.state.zoomFactor}
      panCenter={this.state.panCenter}
      onZoomChanged={this.props.graph.setZoomFactor}
      onPanChanged={this.props.graph.setPanCenter}
    >
      <Viewport
        UNIT={UNIT}
        RATIO={RATIO}
        zoomFactor={this.state.zoomFactor}
        panCenter={this.state.panCenter}
      >
        <EdgesRenderer edges={edges}/>
        <VerticesRenderer vertices={vertices}/>
      </Viewport>
    </Pan>
  }

  componentWillUnmount(): void {
    this.props.graph.removeEventListener(this.setState)
  }
}
