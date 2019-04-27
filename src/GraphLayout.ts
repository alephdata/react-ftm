import { Entity, Model } from '@alephdata/followthemoney'
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

  layout() {
    this.layoutPositions()
  }

  layoutPositions() {
    const vertices = Array.from(this.vertices.values())
    // const byIndex = new Map<number, string>();
    const nodes = vertices.map((vertex, index) => {
      const n = {id: vertex.id, fixed: vertex.fixed} as any
      if (vertex.fixed) {
        n.fx = vertex.position.x;
        n.fy = vertex.position.y;
      }
      // byIndex.set(index, vertex.id)
      return n
    })
    const edges = Array.from(this.edges.values());
    const links = edges.map((edge, index) => {
      return {
        source: nodes.find((n) => n.id == edge.sourceId),
        target: nodes.find((n) => n.id == edge.targetId)
      }
    })

    const simulation = forceSimulation(nodes)
      .force('links', forceLink(links).distance(Vertex.SIZE * 5))
      .force('collide', forceCollide(Vertex.SIZE))
    simulation.stop()
    simulation.tick(200)
    nodes.forEach((node) => {
      if (!node.fixed) {
        const vertex = this.vertices.get(node.id) as Vertex
        const positioned = vertex.setPosition(new Point(node.x, node.y))
        this.vertices.set(positioned.id, positioned)
      }
    })
  }

  toJSON(): any {
    return {
      viewport: this.viewport.toJSON()
    }
  }
}
