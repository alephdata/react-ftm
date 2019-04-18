import { Entity, Value } from '@alephdata/followthemoney'
import { Vertex } from './Vertex'
import { Edge } from './Edge'
import { EntityVertex } from './EntityVertex'
import { ValueVertex } from './ValueVertex'
import { EntityEdge } from './EntityEdge'
import { PropertyEdge } from './PropertyEdge'
import { Point } from './Point'


export interface IGraphEvent {
  vertices: Array<Vertex>,
  edges: Array<Edge>,
  zoomFactor: number,
  panCenter: Point
}

export type GraphEventListener = (event: IGraphEvent) => void

export class Graph {
  panCenter = new Point({x:0, y:0})
  zoomFactor = 4;
  vertices: Map<string, Vertex> = new Map()
  edges: Map<string, Edge> = new Map()
  entities: Map<string, Entity> = new Map()
  listeners : Set<GraphEventListener> = new Set();

  constructor() {
    this.addVertex = this.addVertex.bind(this)
    this.addEdge = this.addEdge.bind(this)
    this.setPanCenter = this.setPanCenter.bind(this)
    this.setZoomFactor = this.setZoomFactor.bind(this)
  }

  setZoomFactor(zoomFactor:number, panCenter:Point = this.panCenter,){
    this.panCenter = panCenter;
    this.zoomFactor = zoomFactor > 0 ? zoomFactor : 1;
    this.emitEvent();
  }

  setPanCenter(nextPanCenter: Point){
    this.panCenter = nextPanCenter;
    this.emitEvent();
  }

  addEventListener(listener:GraphEventListener, context?:any):void{
    if(context){
      this.listeners.add(listener.bind(context))
    } else this.listeners.add(listener)
    this.emitEvent();
  }

  removeEventListener(listener:GraphEventListener):void{
    this.listeners.delete(listener)
  }

  emitEvent() {
    const event = {
      vertices: Array.from(this.vertices.values()),
      edges: Array.from(this.edges.values()),
      zoomFactor: this.zoomFactor,
      panCenter: this.panCenter
    }
    this.listeners.forEach(listener => listener(event))
  }

  addVertex<V extends Vertex>(vertex: V): V {
    if (this.vertices.has(vertex.id)) {
      return this.vertices.get(vertex.id) as V
    }
    this.vertices.set(vertex.id, vertex)
    vertex.onAddedToGraph(this);
    this.emitEvent();
    return vertex
  }

  addEdge<E extends Edge>(edge: E): E {
    if (this.edges.has(edge.id)) {
      return this.edges.get(edge.id) as E
    }
    this.edges.set(edge.id, edge)
    this.emitEvent();
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
