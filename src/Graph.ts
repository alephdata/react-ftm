import { Entity, PropertyType, Value } from '@alephdata/followthemoney'
import { Vertex } from './Vertex'
import { Edge } from './Edge'
import { EntityVertex } from './EntityVertex'
import { ValueVertex } from './ValueVertex'
import { EntityEdge } from './EntityEdge'
import { PropertyEdge } from './PropertyEdge'

export class Graph {
  vertices: Map<string, Vertex> = new Map()
  edges: Map<string, Edge> = new Map()
  entities: Map<string, Entity> = new Map()
  constructor() {
    this.addVertex = this.addVertex.bind(this)
    this.addEdge = this.addEdge.bind(this)
  }
  addVertex<V extends Vertex>(vertex: V): V {
    if (this.vertices.has(vertex.id)) {
      return this.vertices.get(vertex.id) as V
    }
    this.vertices.set(vertex.id, vertex)
    return vertex
  }
  addEdge<E extends Edge>(edge: E): E {
    if (this.edges.has(edge.id)) {
      return this.edges.get(edge.id) as E
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
          return new EntityVertex(propEntity)
        } else throw new Error('No such an entity found' + value)
      }
      const sources = entity
        .getProperty(entity.schema.edge.source)
        .map(convertEntityToPropertyVertex)
        .map(this.addVertex, this)

      const targets = entity
        .getProperty(entity.schema.edge.target)
        .map(convertEntityToPropertyVertex)
        .map(this.addVertex, this)

      sources
        // construction edges from vertices
        .reduce(
          (edges, source) => [
            ...edges,
            ...targets.map(target => new EntityEdge(entity, source, target))
          ],
          [] as Array<Edge>
        )
        .forEach(this.addEdge, this)
    } else {
      const mainVertex = new EntityVertex(entity)
      this.addVertex(mainVertex)

      entity
        // array of Property instances existing in a schema
        .getProperties()
        // removing properties which should cant be represented as a vertex
        .filter(property => property.type.grouped)
        .reduce(
          (vertices, property) => [
            ...vertices,
            ...entity.getProperty(property).map(value => new ValueVertex(entity, property, value))
          ],
          [] as Array<ValueVertex>
        )
        .map(this.addVertex, this)
        .forEach(prop => {
          this.addEdge(new PropertyEdge(mainVertex, prop))
        })
    }
  }
}
