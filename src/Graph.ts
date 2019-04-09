import { Entity, PropertyType, Value } from '@alephdata/followthemoney'
import { Vertex } from './Vertex'
import { Edge } from './Edge'

export class Graph {
  vertices: Map<string, Vertex> = new Map()
  edges: Map<string, Edge> = new Map()
  entities: Map<string, Entity> = new Map()
  constructor() {
    this.addVertex = this.addVertex.bind(this)
    this.addEdge = this.addEdge.bind(this)
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
      const convertEntityToPropertyVertex = (value: Value): Vertex => {
        const propEntity = this.entities.get(value instanceof Entity ? value.id : value)
        if (propEntity) {
          return new Vertex('entity', propEntity.toString(), propEntity.id)
        } else throw new Error('No such an entity found' + value)
      }
      const sources = entity
        .getProperty(entity.schema.edge.source)
        .map(convertEntityToPropertyVertex)
        .map(this.addVertex)

      const targets = entity
        .getProperty(entity.schema.edge.target)
        .map(convertEntityToPropertyVertex)
        .map(this.addVertex)

      sources
        .reduce(
          (edges, source) => [
            ...edges,
            ...targets.map(target => new Edge(target, source, entity.id + source.id + target.id))
          ],
          [] as Array<Edge>
        )
        .forEach(this.addEdge)
    } else {
      const mainVertex = new Vertex('entity', entity.toString(), entity.id)
      this.addVertex(mainVertex)

      entity
        .getProperties()
        .filter(property => property.type.name === PropertyType.ENTITY)
        .reduce(
          (vertices, property) => [
            ...vertices,
            ...entity.getProperty(property).map(value => {
              const prop = value as Entity
              return new Vertex('property', value.toString(), prop.id)
            })
          ],
          [] as Array<Vertex>
        )
        .map(this.addVertex)
        .forEach(prop => {
          this.addEdge(new Edge(mainVertex, prop, entity.id + prop.id))
        })
    }
  }
}
