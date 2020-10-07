import * as React from 'react'
import { Vertex, Point, Rectangle, Edge, GraphElement, Grouping } from '../layout';
import { GraphContext } from '../GraphContext'
import { Canvas } from './Canvas'
import { EdgeRenderer } from './EdgeRenderer'
import { EdgeDrawer } from './EdgeDrawer'
import { VertexRenderer } from './VertexRenderer'
import { GroupingRenderer } from './GroupingRenderer'
import { modes } from 'util/interactionModes'


interface IGraphRendererProps {
  svgRef: React.RefObject<SVGSVGElement>,
  animateTransition: boolean,
  actions: any,
}

export class GraphRenderer extends React.Component<IGraphRendererProps> {
  static contextType = GraphContext;

  constructor(props: any) {
    super(props)
    this.selectElement = this.selectElement.bind(this);
    this.selectArea = this.selectArea.bind(this);
    this.dragSelection = this.dragSelection.bind(this);
    this.dropSelection = this.dropSelection.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
  }

  dragSelection(offset: Point, initialPosition?: Point) {
    const { layout, updateLayout } = this.context;
    layout.dragSelection(offset, initialPosition)
    updateLayout(layout)
  }

  dropSelection() {
    const { layout, updateLayout } = this.context;
    const shouldUpdateHistory = layout.dropSelection()
    updateLayout(layout, null, { modifyHistory:shouldUpdateHistory })
  }

  clearSelection() {
    const { layout, updateLayout } = this.context;
    layout.clearSelection()
    updateLayout(layout)
  }

  selectElement(element: GraphElement | Array<GraphElement>, additional = false) {
    const { layout, updateLayout } = this.context;
    layout.selectElement(element, additional)
    updateLayout(layout, null, { clearSearch: true });
  }

  selectArea(area: Rectangle) {
    const { layout, updateLayout } = this.context;
    layout.selectArea(area)
    updateLayout(layout, null, { clearSearch: true })
  }

  renderGroupings() {
    const { layout } = this.context;
    const { actions } = this.props;
    const groupings = layout.getGroupings();
    return groupings.map((grouping: Grouping) => {
      const vertices = grouping.getVertices()

      return (
        <GroupingRenderer
          key={grouping.id}
          grouping={grouping}
          vertices={vertices}
          selectGrouping={this.selectElement}
          dragSelection={this.dragSelection}
          dropSelection={this.dropSelection}
          actions={actions}
        />
      )
    })
  }

  renderEdges() {
    const { layout } = this.context;
    const { svgRef } = this.props;

    return layout.getEdges().filter((edge: Edge) => !edge.isHidden()).map((edge: Edge) => {
      const vertex1 = layout.vertices.get(edge.sourceId);
      const vertex2 = layout.vertices.get(edge.targetId);
      return  <EdgeRenderer
          key={edge.id}
          svgRef={svgRef}
          edge={edge}
          vertex1={vertex1}
          vertex2={vertex2}
          selectEdge={this.selectElement}
          dragSelection={this.dragSelection}
          dropSelection={this.dropSelection}
        />
    })
  }

  renderVertices() {
    const { layout } = this.context;
    const { actions } = this.props;
    const vertices = layout.getVertices().filter((vertex: Vertex) => !vertex.isHidden())

    return vertices.map((vertex: Vertex) =>
      <VertexRenderer
        key={vertex.id}
        vertex={vertex}
        selectVertex={this.selectElement}
        dragSelection={this.dragSelection}
        dropSelection={this.dropSelection}
        actions={actions}
      />
    )
  }

  getEdgeCreateSourcePoint() {
    const { layout, viewport } = this.context;

    const vertices = layout.getSelectedVertices()
    if (vertices && vertices.length) {
      return viewport.config.gridToPixel(vertices[0].getPosition())
    }
  }

  render(){
    const { interactionMode, viewport } = this.context;
    const { svgRef, animateTransition, actions } = this.props;

    return (
      <Canvas
        svgRef={svgRef}
        selectArea={this.selectArea}
        clearSelection={this.clearSelection}
        animateTransition={animateTransition}
        actions={actions}
        viewBox={viewport.viewBox}
      >
        {interactionMode === modes.EDGE_DRAW &&
          <EdgeDrawer
            svgRef={svgRef}
            sourcePoint={this.getEdgeCreateSourcePoint()}/>
        }
        {this.renderGroupings()}
        {this.renderEdges()}
        {this.renderVertices()}
      </Canvas>
    );
  }
}
