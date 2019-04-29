import { Entity, Model, PropertyType, IEntityDatum } from '@alephdata/followthemoney'
import { forceSimulation, forceLink, forceCollide } from 'd3';
import { Vertex } from './Vertex'
import { Edge } from './Edge'
import { Viewport } from './Viewport'
import { Point } from './Point';
import { Rectangle } from './Rectangle';

interface IGraphLayoutData {
  viewport: any
  entities: Array<IEntityDatum>
  vertices: Array<any>
  edges: Array<any>
  selection: Array<string>
  selectionMode: boolean
}

export type GraphUpdateHandler = (graph: GraphLayout) => void

export class GraphLayout {
  public readonly model: Model
  viewport: Viewport;
  vertices: Map<string, Vertex> = new Map()
  edges: Map<string, Edge> = new Map()
  entities: Map<string, Entity> = new Map()
  selection: Array<string> = new Array()
  selectionMode: boolean = true

  constructor(model: Model) {
    this.model = model
    this.viewport = new Viewport()
    this.addVertex = this.addVertex.bind(this)
    this.addEdge = this.addEdge.bind(this)
    this.addEntity = this.addEntity.bind(this)
  }

  addVertex(vertex: Vertex): Vertex {
    if (this.vertices.has(vertex.id)) {
      return this.vertices.get(vertex.id) as Vertex
    }
    this.vertices.set(vertex.id, vertex)
    return vertex
  }

  getVertices(): Vertex[] {
    return Array.from(this.vertices.values())
  }

  addEdge(edge: Edge): Edge {
    if (this.edges.has(edge.id)) {
      return this.edges.get(edge.id) as Edge
    }
    this.edges.set(edge.id, edge)
    return edge
  }

  getEdges(): Edge[] {
    return Array.from(this.edges.values())
  }

  addEntity(entity: Entity): void {
    this.entities.set(entity.id, entity)
    if (entity.schema.edge) {
      const sourceProperty = entity.schema.getProperty(entity.schema.edge.source)
      const targetProperty = entity.schema.getProperty(entity.schema.edge.target)

      entity.getProperty(sourceProperty).forEach((source) => {
        entity.getProperty(targetProperty).forEach((target) => {
          const sourceVertex = Vertex.fromValue(this, sourceProperty, source)
          const targetVertex = Vertex.fromValue(this, targetProperty, target)
          this.addVertex(sourceVertex)
          this.addVertex(targetVertex)
          this.addEdge(Edge.fromEntity(this, entity, sourceVertex, targetVertex))
        })
      })
    } else {
      const mainVertex = Vertex.fromEntity(this, entity);
      this.addVertex(mainVertex)

      // TODO: make "typesConfig" part of the layout.
      const properties = entity.getProperties()
          // removing properties which should cant be represented as a vertex
          .filter(property => property.type.grouped)

      properties.forEach((prop) => {
        entity.getProperty(prop).forEach((value) => {
          const propertyVertex = Vertex.fromValue(this, prop, value);
          this.addVertex(propertyVertex)
          const propertyEdge = Edge.fromValue(this, prop, mainVertex, propertyVertex)
          this.addEdge(propertyEdge)
        })
      })
    }
  }

  getEntities(): Entity[] {
    return Array.from(this.entities.values())
  }

  selectVertex(vertex: Vertex, additional: boolean = false) {
    if (!this.isVertexSelected(vertex)) {
      if (additional) {
        this.selection = [vertex.id, ...this.selection]
      } else {
        this.selection = [vertex.id]
      }
    }
    console.log('selection', this.selection)
  }

  selectArea(area: Rectangle) {
    const selected = this.getVertices().filter((vertex) => area.contains(vertex.position))
    this.selection = selected.map((vertex) => vertex.id)
  }

  getSelection(): Vertex[] {
    return this.selection
      .filter((vertexId) => this.vertices.has(vertexId))
      .map((vertexId) => this.vertices.get(vertexId)) as Vertex[]
  }

  clearSelection() {
    this.selection = [];
  }

  isVertexSelected(vertex: Vertex): boolean {
    return this.selection.indexOf(vertex.id) !== -1;
  }

  dragSelection(offset: Point) {
    this.getSelection().forEach((vertex) => {
      const position = vertex.position.addition(offset)
      this.vertices.set(vertex.id, vertex.setPosition(position))
    })
  }

  dropSelection() {
    this.getSelection().forEach((vertex) => {
      this.vertices.set(vertex.id, vertex.snapPosition(vertex.position))
    })
  }

  layout() {
    this.vertices.forEach((vertex) => {
      vertex.hidden = vertex.type !== PropertyType.ENTITY && vertex.getDegree() <= 1;
    })
    this.layoutPositions()
  }

  layoutPositions() {
    const nodes = this.getVertices()
      .filter((vertex) => !vertex.hidden)
      .map((vertex) => {
      const n = {id: vertex.id, fixed: vertex.fixed} as any
      if (vertex.fixed) {
        n.fx = vertex.position.x;
        n.fy = vertex.position.y;
      }
      return n
    })
    const links = this.getEdges().map((edge) => {
      return {
        source: nodes.find((n) => n.id == edge.sourceId),
        target: nodes.find((n) => n.id == edge.targetId)
      }
    }).filter((link) => (link.source && link.target))

    const simulation = forceSimulation(nodes)
      .force('links', forceLink(links))
      .force('collide', forceCollide(Vertex.RADIUS))
    simulation.stop()
    simulation.tick(500)
    nodes.forEach((node) => {
      if (!node.fixed) {
        const vertex = this.vertices.get(node.id) as Vertex
        const position = new Point(node.x, node.y)
        this.vertices.set(vertex.id, vertex.snapPosition(position))
      }
    })
  }

  toJSON(): IGraphLayoutData {
    return {
      viewport: this.viewport.toJSON(),
      // entities: this.getEntities().map((entity) => entity.toJSON()),
      entities: [],
      vertices: this.getVertices().map((vertex) => vertex.toJSON()),
      edges: this.getEdges().map((edge) => edge.toJSON()),
      selection: this.selection,
      selectionMode: this.selectionMode
    }
  }

  static fromJSON(model: Model, data: any): GraphLayout {
    const layoutData = data as IGraphLayoutData
    const layout = new GraphLayout(model)
    layoutData.entities.forEach((edata) => {
      layout.addEntity(model.getEntity(edata))
    })
    layoutData.vertices.forEach((vdata) => {
      const vertex = Vertex.fromJSON(layout, vdata)
      layout.vertices.set(vertex.id, vertex)
    })
    layoutData.edges.forEach((edata) => {
      const edge = Edge.fromJSON(layout, edata)
      layout.edges.set(edge.id, edge)
    })
    layout.viewport = Viewport.fromJSON(layoutData.viewport)
    layout.selectionMode = layoutData.selectionMode
    layout.selection = layoutData.selection
    return layout
  }
}
