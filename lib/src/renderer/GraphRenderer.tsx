import * as React from 'react'
import { GraphLayout, GraphUpdateHandler } from '../layout/GraphLayout'
import { Canvas } from '../layout/Canvas'
import { Viewport } from '../layout/Viewport';
import { Vertex } from '../layout/Vertex';
import { Point } from '../layout/Point';
import { Rectangle } from '../layout/Rectangle';
import { EdgeRenderer } from './EdgeRenderer'
import { VertexRenderer } from './VertexRenderer'

export interface IGraphRendererProps {
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler
}

export class GraphRenderer extends React.Component<IGraphRendererProps> {
  constructor(props: any) {
    super(props)
    this.updateViewport = this.updateViewport.bind(this);
    this.selectVertex = this.selectVertex.bind(this);
    this.selectArea = this.selectArea.bind(this);
    this.dragSelection = this.dragSelection.bind(this);
    this.dropSelection = this.dropSelection.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
  }

  updateViewport(viewport: Viewport) {
    const { layout } = this.props;
    layout.viewport = viewport
    this.props.updateLayout(layout)
  }

  dragSelection(offset: Point) {
    const { layout } = this.props;
    layout.dragSelection(offset)
    this.props.updateLayout(layout)
  }

  dropSelection() {
    const { layout } = this.props;
    layout.dropSelection()
    this.props.updateLayout(layout)
  }

  clearSelection() {
    const { layout } = this.props;
    layout.clearSelection()
    this.props.updateLayout(layout)
  }

  selectVertex(vertex: Vertex, additional: boolean = false) {
    const { layout } = this.props;
    layout.selectVertex(vertex, additional)
    this.props.updateLayout(layout)
  }

  selectArea(area: Rectangle) {
    const { layout } = this.props;
    layout.selectArea(area)
    this.props.updateLayout(layout)
  }

  renderEdges() {
    const { layout } = this.props;
    return layout.getEdges().map((edge) =>
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
    return layout.getVertices().map((vertex) =>
      <VertexRenderer
        key={vertex.id}
        viewport={layout.viewport}
        selected={layout.isVertexSelected(vertex)}
        vertex={vertex}
        selectVertex={this.selectVertex}
        dragSelection={this.dragSelection}
        dropSelection={this.dropSelection}
      />
    )
  }

  render(){
    const { layout } = this.props;
    return (
      <Canvas viewport={layout.viewport}
              selectArea={this.selectArea}
              selectionMode={layout.selectionMode}
              clearSelection={this.clearSelection}
              updateViewport={this.updateViewport}>
        {this.renderEdges()}
        {this.renderVertices()}
      </Canvas>
    );
  }
}
