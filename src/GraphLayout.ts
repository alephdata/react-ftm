import { Entity, Model, PropertyType } from '@alephdata/followthemoney'
import { forceSimulation, forceLink, forceCollide } from 'd3';
import { Vertex } from './Vertex'
import { Edge } from './Edge'
import { Viewport } from './Viewport'
import { Point } from './Point';

export type GraphUpdateHandler = (graph: GraphLayout) => void

export class GraphLayout {
  public readonly model: Model
  viewport: Viewport;
  vertices: Map<string, Vertex> = new Map()
  edges: Map<string, Edge> = new Map()
  entities: Map<string, Entity> = new Map()
  selection: Array<string> = new Array()

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

  addEdge(edge: Edge): Edge {
    if (this.edges.has(edge.id)) {
      return this.edges.get(edge.id) as Edge
    }
    this.edges.set(edge.id, edge)
    return edge
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

  clearSelection() {
    this.selection = [];
  }

  isVertexSelected(vertex: Vertex): boolean {
    return this.selection.indexOf(vertex.id) !== -1;
  }

  dragSelection(offset: Point) {
    this.selection.forEach((vertexId) => {
      const vertex = this.vertices.get(vertexId)
      if (vertex) {
        const position = vertex.position.addition(offset)
        this.vertices.set(vertexId, vertex.setPosition(position))
      }
    })
  }

  dropSelection() {
    this.selection.forEach((vertexId) => {
      const vertex = this.vertices.get(vertexId)
      if (vertex) {
        const position = new Point(
          Math.round(vertex.position.x),
          Math.round(vertex.position.y)
        )
        this.vertices.set(vertexId, vertex.setPosition(position))
      }
    })
  }

  layout() {
    this.vertices.forEach((vertex) => {
      vertex.hidden = vertex.type !== PropertyType.ENTITY && vertex.getDegree() <= 1;
    })
    this.layoutPositions()
  }

  layoutPositions() {
    const vertices = Array.from(this.vertices.values())
    const nodes = vertices
      .filter((vertex) => !vertex.hidden)
      .map((vertex) => {
      const n = {id: vertex.id, fixed: vertex.fixed} as any
      if (vertex.fixed) {
        n.fx = vertex.position.x;
        n.fy = vertex.position.y;
      }
      return n
    })
    const edges = Array.from(this.edges.values());
    const links = edges.map((edge) => {
      return {
        source: nodes.find((n) => n.id == edge.sourceId),
        target: nodes.find((n) => n.id == edge.targetId)
      }
    }).filter((link) => (link.source && link.target))

    const simulation = forceSimulation(nodes)
      .force('links', forceLink(links))
      .force('collide', forceCollide(Vertex.RADIUS * 2))
    simulation.stop()
    simulation.tick(200)
    nodes.forEach((node) => {
      if (!node.fixed) {
        const vertex = this.vertices.get(node.id) as Vertex
        const position = new Point(
          Math.round(node.x),
          Math.round(node.y)
        )
        const positioned = vertex.setPosition(position)
        this.vertices.set(positioned.id, positioned)
      }
    })
  }

  toJSON(): any {
    return {
      viewport: this.viewport.toJSON(),
      selection: this.selection
    }
  }
}
