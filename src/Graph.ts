// @ts-ignore
import { Entity, PropertyType } from '@alephdata/followthemoney'
import { Vertex } from './Vertex'
import { Edge } from './Edge'

export class Graph {
  vertices: Array<Vertex> = []
  edges: Array<Edge> = []
  entities: Array<Entity> = []
  addEntity(entity: Entity): void {
    if (entity.schema.isEdge) {
      const sources = entity.getProperty(entity.schema.edge.source).map(value => {
        const entity = value as Entity
        return new Vertex('entity', entity.toString(), entity.id)
      })
      this.vertices.push(...sources)

      const targets = entity.getProperty(entity.schema.edge.target).map(value => {
        const entity = value as Entity
        return new Vertex('entity', entity.toString(), entity.id)
      })
      this.vertices.push(...targets)

      const edges = sources.reduce(
        (edges, source) => [
          ...edges,
          ...targets.map(target => new Edge(target, source, entity.id))
        ],
        [] as Array<Edge>
      )
      this.edges.push(...edges)
    } else {
      const vertex = new Vertex('entity', entity.toString(), entity.id)
      this.vertices.push(vertex)

      const vertices = entity
        .getProperties()
        .filter(property => property.type.name === PropertyType.ENTITY)
        .reduce(
          (vertices, property) => [
            ...vertices,
            ...entity.getProperty(property).map(value => {
              const prop = value as Entity
              return new Vertex('propery', value.toString(), prop.id)
            })
          ],
          [] as Array<Vertex>
        )
      this.vertices.push(...vertices)
      vertices.forEach(prop => {
        this.edges.push(new Edge(vertex, prop, entity.id))
      })
    }
  }
}
