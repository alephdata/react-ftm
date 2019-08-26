import * as React from 'react'
import { Viewport } from '../Viewport';
import { Vertex, Point, Rectangle, Edge, GraphElement } from '../layout';
import { IGraphContext } from '../GraphContext'
import { Canvas } from './Canvas'
import { EdgeRenderer } from './EdgeRenderer'
import { EdgeDrawer } from './EdgeDrawer'
import { VertexRenderer } from './VertexRenderer'
import { modes } from '../interactionModes'


interface IGraphRendererProps extends IGraphContext {
  svgRef: React.RefObject<SVGSVGElement>,
  animateTransition: boolean,
  actions: any,
  interactionMode: string
}

export class GraphRenderer extends React.Component<IGraphRendererProps> {
  constructor(props: any) {
    super(props)
    this.updateViewport = this.updateViewport.bind(this);
    this.selectElement = this.selectElement.bind(this);
    this.selectArea = this.selectArea.bind(this);
    this.dragSelection = this.dragSelection.bind(this);
    this.dropSelection = this.dropSelection.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
  }

  updateViewport(viewport: Viewport) {
    this.props.updateViewport(viewport)
  }

  dragSelection(offset: Point) {
    const { layout } = this.props;
    layout.dragSelection(offset)
    this.props.updateLayout(layout)
  }

  dropSelection() {
    const { layout } = this.props;
    const shouldUpdateHistory = layout.dropSelection()
    this.props.updateLayout(layout, {modifyHistory:shouldUpdateHistory})
  }

  clearSelection() {
    const { layout } = this.props;
    layout.clearSelection()
    this.props.updateLayout(layout)
  }

  selectElement(element: GraphElement, additional: boolean = false) {
    const { layout } = this.props;
    layout.selectElement(element, additional)
    this.props.updateLayout(layout)
  }

  selectArea(area: Rectangle) {
    const { layout } = this.props;
    layout.selectArea(area)
    this.props.updateLayout(layout)
  }

  renderEdges() {
    const { layout } = this.props;
    const edgeGroups = layout.getEdgeGroups()
    let allEdges = [];

    for (let key in edgeGroups) {
      const edgeGroup = edgeGroups[key]
      const edges = edgeGroup.map((edge: Edge, i: number) => {
          const [vertex1Id, vertex2Id] = [edge.sourceId, edge.targetId].sort()
          const vertex1 = layout.vertices.get(vertex1Id);
          const vertex2 = layout.vertices.get(vertex2Id);
          return  <EdgeRenderer
              key={edge.id}
              config={layout.config}
              edge={edge}
              highlight={layout.isEdgeHighlighted(edge)}
              vertex1={vertex1}
              vertex2={vertex2}
              selectEdge={this.selectElement}
              groupEdgeCount={edgeGroup.length}
              offsetIndex={i}
              direction={edge.sourceId === vertex1Id ? 'backward' : 'forward'}
            />
        })
      allEdges.push(edges)
    }
    return allEdges
  }

  renderVertices() {
    const { layout, actions, interactionMode } = this.props;
    const vertices = layout.getVertices().filter((vertex) => !vertex.isHidden())
    return vertices.map((vertex: Vertex) =>
      <VertexRenderer
        key={vertex.id}
        config={layout.config}
        selected={layout.isElementSelected(vertex)}
        vertex={vertex}
        selectVertex={this.selectElement}
        dragSelection={this.dragSelection}
        dropSelection={this.dropSelection}
        interactionMode={interactionMode}
        actions={actions}
      />
    )
  }

  getEdgeCreateSourcePoint() {
    const vertices = this.props.layout.getSelectedVertices()
    if (vertices && vertices.length) {
      return this.props.viewport.config.gridToPixel(vertices[0].getPosition())
    }
  }

  render(){
    const { svgRef, layout, viewport, animateTransition, actions, interactionMode } = this.props;

    return (
      <Canvas svgRef={svgRef}
              viewport={viewport}
              selectArea={this.selectArea}
              interactionMode={interactionMode}
              clearSelection={this.clearSelection}
              updateViewport={this.updateViewport}
              animateTransition={animateTransition}
              actions={actions}>
        {interactionMode === modes.EDGE_DRAW &&
          <EdgeDrawer
            svgRef={svgRef}
            viewport={viewport}
            sourcePoint={this.getEdgeCreateSourcePoint()}/>
        }
        {this.renderEdges()}
        {this.renderVertices()}
      </Canvas>
    );
  }
}
