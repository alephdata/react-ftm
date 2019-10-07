import * as React from 'react'
import { Viewport } from '../Viewport';
import { Vertex, Point, Rectangle, Edge, GraphElement, Grouping } from '../layout';
import { IGraphContext } from '../GraphContext'
import { Canvas } from './Canvas'
import { EdgeRenderer } from './EdgeRenderer'
import { EdgeDrawer } from './EdgeDrawer'
import { VertexRenderer } from './VertexRenderer'
import { GroupingRenderer } from './GroupingRenderer'
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
    this.selectElement = this.selectElement.bind(this);
    this.selectArea = this.selectArea.bind(this);
    this.dragSelection = this.dragSelection.bind(this);
    this.dropSelection = this.dropSelection.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
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

  selectElement(element: GraphElement | Array<GraphElement>, additional: boolean = false) {
    const { layout } = this.props;
    console.log('in selectelement', element)
    layout.selectElement(element, additional)
    this.props.updateLayout(layout)
  }

  selectArea(area: Rectangle) {
    const { layout } = this.props;
    layout.selectArea(area)
    this.props.updateLayout(layout)
  }

  renderGroupings() {
    const { layout } = this.props;
    const groupings = layout.getGroupings();
    return groupings.map((grouping: Grouping) => {
      const vertices = grouping.vertices.map((vertexId) => layout.vertices.get(vertexId)) as Vertex[]

      return (
        <GroupingRenderer
          key={grouping.id}
          config={layout.config}
          grouping={grouping}
          vertices={vertices}
          selected={layout.isGroupingSelected(grouping) || layout.selection.length === 0}
          selectGrouping={this.selectElement}
        />
      )
    })
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
              highlight={layout.isEdgeHighlighted(edge) || layout.selection.length === 0}
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

    console.log('vertices to render', vertices)
    return vertices.map((vertex: Vertex) =>
      <VertexRenderer
        key={vertex.id}
        config={layout.config}
        selected={layout.isElementSelected(vertex) || layout.selection.length === 0}
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

    console.log(layout.selection, layout.vertices);

    return (
      <Canvas svgRef={svgRef}
              viewport={viewport}
              selectArea={this.selectArea}
              interactionMode={interactionMode}
              clearSelection={this.clearSelection}
              updateViewport={this.props.updateViewport}
              animateTransition={animateTransition}
              actions={actions}>
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
