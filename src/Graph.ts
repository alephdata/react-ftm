import { Entity, PropertyType } from '@alephdata/followthemoney'
import { Vertex } from './Vertex'
import { Edge } from './Edge'

export class Graph {
  vertices: Array<Vertex> = []
  edges: Array<Edge> = []
  entities: Array<Entity> = []
  constructor() {
    this.addVertex = this.addVertex.bind(this)
    this.addEdge = this.addEdge.bind(this)
  }
  addVertex(vertex: Vertex): Vertex {
    const existingVertex = this.vertices.find(vertex.equals)
    if (existingVertex) {
      return existingVertex
    }
    this.vertices.push(vertex)
    return vertex
  }
  addEdge(edge: Edge): Edge {
    const existingEdge = this.edges.find(edge.equals)
    if (existingEdge) {
      return existingEdge
    }
    this.edges.push(edge)
    return edge
  }
  addEntity(entity: Entity): void {
    this.entities.push(entity)
    if (entity.schema.edge) {
      const sources = entity
        .getProperty(entity.schema.edge.source)
        .map(value => {
          const propEntity = this.entities.find(e => e.id === value)
          if (propEntity) {
            return new Vertex('entity', propEntity.toString(), propEntity.id)
          } else throw new Error('No such an entity found' + value)
        })
        .map(this.addVertex)

      const targets = entity
        .getProperty(entity.schema.edge.target)
        .map(value => {
          const propEntity = this.entities.find(e => e.id === value)
          if (propEntity) {
            return new Vertex('entity', propEntity.toString(), propEntity.id)
          } else throw new Error('No such an entity found' + value)
        })
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
          this.edges.push(new Edge(mainVertex, prop, entity.id + prop.id))
        })
    }
  }
}
