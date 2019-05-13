import { Entity, Model, IEntityDatum } from '@alephdata/followthemoney'
import { forceSimulation, forceLink, forceCollide } from 'd3';
import { Vertex } from './Vertex'
import { Edge } from './Edge'
import { Viewport } from './Viewport'
import { Point } from './Point';
import { Rectangle } from './Rectangle';
import { GraphConfig } from '../GraphConfig';

interface IGraphLayoutData {
  viewport: any
  entities: Array<IEntityDatum>
  vertices: Array<any>
  edges: Array<any>
  selection: Array<string>
  selectionMode: boolean
}

export type VertexPredicate = (vertex: Vertex) => boolean

export class GraphLayout {
  public readonly config: GraphConfig
  public readonly model: Model
  viewport: Viewport;
  vertices = new Map<string, Vertex>()
  edges = new Map<string, Edge>()
  entities = new Map<string, Entity>()
  selection = new Array<string>()
  selectionMode: boolean = true

  constructor(config: GraphConfig, model: Model) {
    this.config = config
    this.model = model
    this.viewport = new Viewport(config)
    this.addVertex = this.addVertex.bind(this)
    this.addEdge = this.addEdge.bind(this)
    this.addEntity = this.addEntity.bind(this)
  }

  addVertex(vertex: Vertex): Vertex {
    const existing = this.vertices.get(vertex.id)
    if (existing) {
      this.vertices.set(vertex.id, existing.update(vertex))
    } else {
      this.vertices.set(vertex.id, vertex)
    }
    return this.vertices.get(vertex.id) as Vertex
  }

  getVertices(): Vertex[] {
    return Array.from(this.vertices.values())
  }

  addEdge(edge: Edge): Edge {
    const existing = this.edges.get(edge.id)
    if (existing) {
      this.edges.set(edge.id, existing.update(edge))
    } else {
      this.edges.set(edge.id, edge)
    }
    return this.edges.get(edge.id) as Edge
  }

  getEdges(): Edge[] {
    return Array.from(this.edges.values())
  }

  private generate(): void {
    this.edges.forEach(edge => edge.garbage = true);
    this.vertices.forEach(vertex => vertex.garbage = true);
    this.entities.forEach((entity) => {
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
        // removing properties which should not be represented as a vertex
          .filter(property => property.type.grouped);
  
        properties.forEach((prop) => {
          entity.getProperty(prop).forEach((value) => {
            const propertyVertex = Vertex.fromValue(this, prop, value);
            this.addVertex(propertyVertex)
            this.addEdge(Edge.fromValue(this, prop, mainVertex, propertyVertex))
          })
        })
      }
    })
    this.edges.forEach(edge => edge.garbage && this.edges.delete(edge.id));
    this.vertices.forEach(vertex => vertex.garbage && this.vertices.delete(vertex.id));
  }

  addEntity(entity: Entity) {
    this.entities.set(entity.id, entity)
    this.generate()
  }

  getEntities(): Entity[] {
    return Array.from(this.entities.values())
  }

  getVertexByEntity(entity: Entity): Vertex | undefined {
    return this.getVertices().filter((v) => v.isEntity).find((v) => v.entityId === entity.id)
  }

  selectVertex(vertex: Vertex, additional: boolean = false) {
    if (!this.isVertexSelected(vertex)) {
      if (additional) {
        this.selection = [vertex.id, ...this.selection]
      } else {
        this.selection = [vertex.id]
      }
    }
  }

  selectVerticesByFilter(predicate: VertexPredicate) {
    this.selection = this.getVertices().filter(predicate).map((v) => v.id)
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

  getSelectedEntities(){
    return this.getRelatedEntities(
      this.getSelection()
    )
  }

  getRelatedEntities(elements: Array<Vertex | Edge>): Array<Entity>{
    return Array.from(elements.reduce((entities, element) => {
      if(this.entities.has(element.entityId as string)){
        entities.add(
          this.entities.get(element.entityId as string) as Entity
        )
      }
      return entities
    }, new Set<Entity>()).values())
  }

  hasSelection(): boolean {
    return this.getSelection().length > 0
  }
 
  clearSelection() {
    this.selection = [];
  }

  isVertexSelected(vertex: Vertex): boolean {
    return this.selection.indexOf(vertex.id) !== -1;
  }

  isEdgeSelected(edge: Edge): boolean {
    return this.selection.indexOf(edge.sourceId) !== -1 ||
      this.selection.indexOf(edge.targetId) !== -1;
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

  removeSelection() {
    this.getSelection().forEach((vertex) => {
      if (vertex.entityId) {
        this.entities.delete(vertex.entityId)
        this.edges.forEach((edge) => {
          if (edge.isEntity() && edge.isLinkedToVertex(vertex)) {
            this.entities.delete(edge.entityId as string)
          }
        })
      } else {
        vertex.hidden = true
      }
    })
    this.generate()
  }

  layout() {
    this.generate()
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
        source: nodes.find((n) => n.id === edge.sourceId),
        target: nodes.find((n) => n.id === edge.targetId)
      }
    }).filter((link) => (link.source && link.target))

    const simulation = forceSimulation(nodes)
      .force('links', forceLink(links))
      .force('collide', forceCollide(this.config.VERTEX_RADIUS))
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
      entities: this.getEntities().map((entity) => entity.toJSON()),
      vertices: this.getVertices().map((vertex) => vertex.toJSON()),
      edges: this.getEdges().map((edge) => edge.toJSON()),
      selection: this.selection,
      selectionMode: this.selectionMode
    }
  }

  static fromJSON(config: GraphConfig, model: Model, data: any): GraphLayout {
    const layoutData = data as IGraphLayoutData
    const layout = new GraphLayout(config, model)
    layoutData.entities.forEach((edata) => {
      layout.entities.set(edata.id, model.getEntity(edata))
    })
    layoutData.vertices.forEach((vdata) => {
      const vertex = Vertex.fromJSON(layout, vdata)
      layout.vertices.set(vertex.id, vertex)
    })
    layoutData.edges.forEach((edata) => {
      const edge = Edge.fromJSON(layout, edata)
      layout.edges.set(edge.id, edge)
    })
    layout.generate()
    layout.viewport = Viewport.fromJSON(config, layoutData.viewport)
    layout.selectionMode = layoutData.selectionMode
    layout.selection = layoutData.selection
    return layout
  }
}
