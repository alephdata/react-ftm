import * as React from 'react'
import { Viewport } from '../Viewport';
import { Vertex, Point, Rectangle, Edge, GraphElement, Grouping } from '../layout';
import { GraphContext } from '../GraphContext'
import { Canvas } from './Canvas'
import { EdgeRenderer } from './EdgeRenderer'
import { EdgeDrawer } from './EdgeDrawer'
import { VertexRenderer } from './VertexRenderer'
import { GroupingRenderer } from './GroupingRenderer'
import { modes } from '../utils/interactionModes'


interface IGraphRendererProps {
  svgRef: React.RefObject<SVGSVGElement>,
  animateTransition: boolean,
  actions: any,
  interactionMode: string
  writeable: boolean
}

class GraphRenderer extends React.Component<IGraphRendererProps> {
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

  selectElement(element: GraphElement | Array<GraphElement>, additional: boolean = false) {
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
    const { actions, interactionMode, writeable } = this.props;
    const groupings = layout.getGroupings();
    return groupings.map((grouping: Grouping) => {
      const vertices = grouping.getVertices()

      return (
        <GroupingRenderer
          key={grouping.id}
          config={layout.config}
          grouping={grouping}
          vertices={vertices}
          highlighted={layout.isGroupingSelected(grouping) || layout.isGroupingMemberSelected(grouping) || layout.selection.length === 0}
          selected={layout.isGroupingSelected(grouping)}
          selectGrouping={this.selectElement}
          dragSelection={this.dragSelection}
          dropSelection={this.dropSelection}
          interactionMode={interactionMode}
          actions={actions}
          writeable={writeable}
        />
      )
    })
  }

  renderEdges() {
    const { layout } = this.context;
    const { svgRef, writeable } = this.props;

    return layout.getEdges().filter((edge: Edge) => !edge.isHidden()).map((edge: Edge) => {
      const vertex1 = layout.vertices.get(edge.sourceId);
      const vertex2 = layout.vertices.get(edge.targetId);
      return  <EdgeRenderer
          key={edge.id}
          config={layout.config}
          svgRef={svgRef}
          edge={edge}
          highlight={layout.isEdgeHighlighted(edge) || layout.selection.length === 0}
          vertex1={vertex1}
          vertex2={vertex2}
          selectEdge={this.selectElement}
          dragSelection={this.dragSelection}
          dropSelection={this.dropSelection}
          writeable={writeable}
        />
    })
  }

  renderVertices() {
    const { entityManager, layout } = this.context;
    const { actions, interactionMode, writeable } = this.props;
    const vertices = layout.getVertices().filter((vertex: Vertex) => !vertex.isHidden())

    return vertices.map((vertex: Vertex) =>
      <VertexRenderer
        key={vertex.id}
        config={layout.config}
        highlighted={layout.isElementSelected(vertex) || layout.selection.length === 0}
        selected={layout.isElementSelected(vertex)}
        vertex={vertex}
        selectVertex={this.selectElement}
        dragSelection={this.dragSelection}
        dropSelection={this.dropSelection}
        interactionMode={interactionMode}
        actions={actions}
        writeable={writeable}
        hasExpand={entityManager.hasExpand}
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
    const { layout, updateViewport, viewport } = this.context;
    const { svgRef, animateTransition, actions, interactionMode, writeable } = this.props;

    return (
      <Canvas
        svgRef={svgRef}
        viewport={viewport}
        selectArea={this.selectArea}
        interactionMode={interactionMode}
        clearSelection={this.clearSelection}
        updateViewport={updateViewport}
        animateTransition={animateTransition}
        actions={actions}
        writeable={writeable}
      >
        {interactionMode === modes.EDGE_DRAW &&
          <EdgeDrawer
            svgRef={svgRef}
            viewport={viewport}
            sourcePoint={this.getEdgeCreateSourcePoint()}/>
        }
        {this.renderGroupings()}
        {this.renderEdges()}
        {this.renderVertices()}
      </Canvas>
    );
  }
}

GraphRenderer.contextType = GraphContext;

export { GraphRenderer };
