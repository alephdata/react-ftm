import { Entity } from '@alephdata/followthemoney'
import { Vertex } from './Vertex'
import { Edge } from './Edge'
import { Viewport } from './Viewport'

export type GraphUpdateHandler = (graph: Graph) => void

export class Graph {
  viewport: Viewport;
  vertices: Map<string, Vertex> = new Map()
  edges: Map<string, Edge> = new Map()
  entities: Map<string, Entity> = new Map()

  constructor() {
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
    vertex.onAddedToGraph();
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
}
