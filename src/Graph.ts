import { Entity, Value } from '@alephdata/followthemoney'
import { Map, Record } from 'immutable';
import { Vertex } from './Vertex'
import { Edge } from './Edge'
import { EntityVertex } from './EntityVertex'
import { ValueVertex } from './ValueVertex'
import { EntityEdge } from './EntityEdge'
import { PropertyEdge } from './PropertyEdge'

export interface IGraphStorage {
  vertices: Map<string, Vertex>
  edges: Map<string, Edge>
  entities: Map<string, Entity>
}

export class Graph {
  static StorageRecord = Record<IGraphStorage>({
    vertices: Map<string, Vertex>(),
    edges: Map<string, Edge>(),
    entities: Map<string, Entity>()
  })
  storage = Graph.StorageRecord()
  listeners : Array<Function> = [];
  addEventListener(listener:Function):void{
    this.listeners.push(listener)
  }
  emitEvent(){
    this.listeners.forEach(listener => listener(this.storage))
  }
  addVertex<V extends Vertex>(vertex: V): V {
    const keyPath = ['vertices', vertex.id];
    if (!this.storage.hasIn(keyPath)) {
      this.emitEvent();
      vertex.onAddedToGraph(this);
      this.storage = this.storage.setIn(keyPath, vertex)
    }
    return this.storage.getIn(keyPath) as V;
  }
  addEdge<E extends Edge>(edge: E): E  {
    const keyPath = ['edges', edge.id];
    if (!this.storage.hasIn(keyPath)) {
      this.storage = this.storage.setIn(keyPath, edge);
    }
    this.emitEvent();
    return this.storage.getIn(keyPath) as E;
  }
  addEntity(entity: Entity): void {
    this.storage = this.storage.setIn(['entities',entity.id], entity);
    if (entity.schema.edge) {
      const convertEntityToPropertyVertex = (value: Value): Vertex => {
        const propEntity = this.storage.getIn(['entities', value instanceof Entity ? value.id : value])
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
        .forEach(prop => this.addEdge(new PropertyEdge(mainVertex, prop)))
    }
  }

}
