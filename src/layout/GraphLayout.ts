import { Entity, IEntityDatum } from '@alephdata/followthemoney'
import { forceSimulation, forceLink, forceCollide } from 'd3-force';
import { DraggableEvent } from 'react-draggable';
import { Vertex } from './Vertex'
import { Edge } from './Edge'
import { Grouping } from './Grouping'
import { Point } from './Point';
import { Rectangle } from './Rectangle';
import { EntityManager } from '../EntityManager';
import { GraphConfig } from '../GraphConfig';

export interface IGraphLayoutData {
  entities: Array<IEntityDatum>
  vertices: Array<any>
  edges: Array<any>
  groupings?: Array<any>
  selection?: Array<string>
}

export type VertexPredicate = (vertex: Vertex) => boolean

export type GraphElement = Vertex | Edge

export class GraphLayout {
  public readonly config: GraphConfig
  public readonly entityManager: EntityManager
  vertices = new Map<string, Vertex>()
  edges = new Map<string, Edge>()
  entities = new Map<string, Entity>()
  groupings = new Map<string, Grouping>()
  selection = new Array<string>()
  private hasDraggedSelection = false

  constructor(config: GraphConfig, entityManager: EntityManager) {
    this.config = config;
    this.entityManager = entityManager;

    this.addVertex = this.addVertex.bind(this);
    this.addEdge = this.addEdge.bind(this);
    this.addEntities = this.addEntities.bind(this);
    this.createEntity = this.createEntity.bind(this);
    this.removeEntity = this.removeEntity.bind(this);
    this.isGroupingSelected = this.isGroupingSelected.bind(this);
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
          .filter(property => property.type.pivot);

        properties.forEach((prop) => {
          entity.getProperty(prop).forEach((value) => {
            let propertyVertex;
            // if property contains an entity reference, draw edge to referred entity,
            //  otherwise create value node
            if (prop.type.name === 'entity') {
              const entity = typeof value === 'string' ? this.entities.get(value) : value;
              if (entity?.id) {
                propertyVertex = this.getVertexByEntity(entity);
              }
            } else {
              propertyVertex = Vertex.fromValue(this, prop, value);
              this.addVertex(propertyVertex)
            }
            if (propertyVertex) {
              this.addEdge(Edge.fromValue(this, prop, mainVertex, propertyVertex));
            }
          })
        })
      }
    })
    this.edges.forEach(edge => edge.garbage && this.edges.delete(edge.id));
    this.vertices.forEach(vertex => vertex.garbage && this.vertices.delete(vertex.id));
  }

  createEntity(entityData: any) {
    const entity = this.entityManager.createEntity(entityData);
    this.addEntities([entity]);
    return entity;
  }

  addEntities(entities: Array<Entity>) {
    entities.map(e => this.entities.set(e.id, e));
    this.layout();
  }

  updateEntity(entity: Entity) {
    this.entities.set(entity.id, entity)
    this.layout()

    this.entityManager.updateEntity(entity);

    return entity;
  }

  removeEntity(entityId: string, propagate?: boolean) {
    this.entities.delete(entityId)
    if (propagate) {
      this.entityManager.deleteEntity(entityId);
    }
  }

  getEntities(): Entity[] {
    return Array.from(this.entities.values())
  }

  hasEntity(entity: Entity): boolean {
    return this.entities.has(entity.id);
  }

  addGrouping(grouping: Grouping) {
    this.groupings.set(grouping.id, grouping)
    this.removeSubgroups()
  }

  getGroupings(): Grouping[] {
    return Array.from(this.groupings.values());
  }

  getVertexByEntity(entity: Entity): Vertex | undefined {
    return this.getVertices()
      .filter((v) => v.isEntity)
      .find((v) => v.entityId === entity.id)
  }

  selectElement(element: GraphElement | Array<GraphElement>, additional: boolean = false, allowUnselect: boolean = false) {
    const newSelection = Array.isArray(element) ? element.map(e => e.id) : [element.id]
    const isAlreadySelected = this.isElementSelected(element);

    if (allowUnselect && isAlreadySelected) {
      this.selection = this.selection.filter(id => newSelection.indexOf(id) < 0);
    } else {
      if (!additional) {
        this.selection = newSelection
      } else if (!isAlreadySelected) {
        this.selection = [...this.selection, ...newSelection]
      }
    }
  }

  selectVerticesByFilter(predicate: VertexPredicate, additional: boolean = false, allowUnselect: boolean = false) {
    const vertices = this.getVertices().filter((vertex) => !vertex.isHidden()).filter(predicate);
    this.selectElement(vertices, additional, allowUnselect);
  }

  selectArea(area: Rectangle) {
    const selected = this.getVertices().filter((vertex) => !vertex.isHidden() && area.contains(vertex.position))
    this.selection = selected.map((vertex) => vertex.id)

    const grouping = Grouping.fromSelection(this, selected);

    if (grouping) {
      this.addGrouping(grouping);
    }
  }

  getSelectedVertices(): Vertex[] {
    return this.selection
      .filter((vertexId) => this.vertices.has(vertexId))
      .map((vertexId) => this.vertices.get(vertexId)) as Vertex[]
  }

  getSelectedEntities() {
    return this.getRelatedEntities(
      ...this.getSelectedVertices(), ...this.getSelectedEdges()
    )
  }

  getSelectedGroupings(): Grouping[] {
    return this.getGroupings()
      .filter(grouping => grouping.id !== 'selectedArea' && this.isGroupingSelected(grouping))
  }

  getRelatedEntities(...elements: Array<GraphElement>): Array<Entity> {
    return Array.from(elements.reduce((entities, element) => {
      if (this.entities.has(element.entityId as string)) {
        entities.add(
          this.entities.get(element.entityId as string) as Entity
        )
      }
      return entities
    }, new Set<Entity>()).values())
  }

  getSelectedEdges(): Edge[] {
    return this.selection
      .filter((edgeId) => this.edges.has(edgeId))
      .map((edgeId) => this.edges.get(edgeId)) as Edge[]
  }

  getHighlightedEdges(): Edge[] {
    return this.getEdges()
      .filter(edge => edge.isEntity() && this.isEdgeHighlighted(edge))
  }

  getSelectionAdjacentEdges(): Edge[] {
    return this.getEdges()
      .filter(edge => this.isEdgeSelectionAdjacent(edge))
  }

  hasSelection(): boolean {
    return this.selection.length > 0
  }

  clearSelection() {
    this.selection = [];
    this.groupings.delete('selectedArea');
  }

  isElementSelected(element: GraphElement | Array<GraphElement>) {
    if (Array.isArray(element)) {
      return element.every(elem => this.selection.includes(elem.id));
    } else {
      return this.selection.indexOf(element.id) !== -1;
    }
  }

  isGroupingSelected(grouping: Grouping) {
    const selectedVertices = this.selection
      .filter((vertexId) => this.vertices.has(vertexId))

    return grouping.getVertexIds()
      .every(v => selectedVertices.includes(v));
  }

  isGroupingMemberSelected(grouping: Grouping) {
    const selectedVertices = this.selection
      .filter((vertexId) => this.vertices.has(vertexId))

    return grouping.getVertexIds()
      .some(v => selectedVertices.includes(v));
  }

  isEdgeHighlighted(edge: Edge): boolean {
    return this.isElementSelected(edge) || this.isEdgeSelectionAdjacent(edge)
  }

  isEdgeSelectionAdjacent(edge: Edge): boolean {
    return this.selection.indexOf(edge.sourceId) !== -1 ||
      this.selection.indexOf(edge.targetId) !== -1;
  }

  dragSelection(offset: Point, initialPosition?: Point) {
    this.getSelectedVertices().forEach((vertex) => {
      const position = vertex.position.addition(offset)
      this.vertices.set(vertex.id, vertex.setPosition(position))
    })

    this.getSelectedEdges().forEach((edge) => {
      this.dragEdge(edge, offset, initialPosition)
    })

    this.getSelectionAdjacentEdges().forEach((edge) => {
      this.dragEdge(edge, offset)
    })

    this.hasDraggedSelection = true
  }

  dragEdge(edge: Edge, offset: Point, initialPosition?: Point) {
    let labelPosition;

    if (edge.labelPosition) {
      labelPosition = edge.labelPosition.addition(offset)
    } else if (initialPosition) {
      labelPosition = initialPosition
    } else {
      return;
    }
    this.edges.set(edge.id, edge.setLabelPosition(labelPosition))
  }

  removeSubgroups() {
    const selectedGroupings = this.getSelectedGroupings();
    const allGroupings = this.getGroupings().filter(grouping => grouping.id !== 'selectedArea');

    selectedGroupings.forEach(selected => {
      const selectedVertList = Array.from(selected.vertices);
      let isSubgroup = false;
      allGroupings.forEach(grouping => {
        if (selected.id !== grouping.id) {
          isSubgroup = selectedVertList.every(id => grouping.vertices.has(id));
          if (isSubgroup) {
            this.groupings.delete(selected.id)
            return;
          }
        }
      })
    })
  }

  dropSelection() {
    const vertices = this.getSelectedVertices();

    vertices.forEach((vertex) => {
      this.vertices.set(vertex.id, vertex.snapPosition(vertex.position))
      this.addVertexToGroupings(vertex)
      this.removeSubgroups()
    });

    if (this.hasDraggedSelection) {
      this.hasDraggedSelection = false;
      return true;
    }
  }

  removeSelection() {
    const removedEntities: Array<Entity | undefined> = [];

    this.getSelectedVertices().forEach((vertex) => {
      if (vertex.entityId) {
        removedEntities.push(vertex.getEntity());
        this.removeEntity(vertex.entityId, true);
        this.edges.forEach((edge) => {
          if (edge.isEntity() && edge.isLinkedToVertex(vertex) && edge.entityId) {
            removedEntities.push(edge.getEntity());
            this.removeEntity(edge.entityId, true);
          }
        })
      } else {
        vertex.hidden = true
      }
      this.getGroupings().forEach(grouping => {
        grouping.removeVertex(vertex)
        if (grouping.vertices.size < 2) {
          this.groupings.delete(grouping.id)
        }
      })
    })
    this.getSelectedEdges().forEach((edge) => {
      const entity = edge.getEntity()
      if (entity) {
        if (edge.isEntity()) {
          removedEntities.push(edge.getEntity());
          this.removeEntity(entity.id, true);
        } else {
          // TODO: Remove value
        }
      }
    })

    this.layout()

    return removedEntities;
  }

  ungroupSelection() {
    this.getSelectedGroupings().forEach((grouping) => {
      this.groupings.delete(grouping.id)
    })
  }

  addVertexToGroupings(vertex: Vertex) {
    this.getGroupings().forEach(grouping => {
      if (grouping.id === 'selectedArea') { return }
      const area = grouping.getBoundingRect();
      if (area.contains(this.config.gridToPixel(vertex.position))) {
        this.groupings.set(grouping.id, grouping.addVertex(vertex))
      }
    })
  }

  getVisibleVertexRect() {
    const vertices = this.getVertices();
    const points = vertices.filter((v) => !v.isHidden()).map((v) => v.position)
    return Rectangle.fromPoints(...points);
  }

  layout() {
    this.generate()
    this.layoutPositions()
  }

  layoutPositions() {
    const nodes = this.getVertices()
      .filter((vertex) => !vertex.isHidden())
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
      .force('links', forceLink(links).distance(3))
      .force('collide', forceCollide(this.config.DEFAULT_VERTEX_RADIUS).strength(2))
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

  clone():GraphLayout{
    return this.update(this.toJSON());
  }

  update(withData:IGraphLayoutData):GraphLayout{
    return GraphLayout.fromJSON(this.config, this.entityManager, withData)
  }

  toJSON(): IGraphLayoutData {
    return {
      entities: this.getEntities().map((entity) => entity.toJSON()),
      vertices: this.getVertices().map((vertex) => vertex.toJSON()),
      edges: this.getEdges().map((edge) => edge.toJSON()),
      groupings: this.getGroupings().map((grouping) => grouping.toJSON()),
      selection: this.selection
    }
  }

  static fromJSON(config: GraphConfig, entityManager: EntityManager, data: any): GraphLayout {
    const layoutData = data as IGraphLayoutData
    const layout = new GraphLayout(config, entityManager)

    layoutData.entities.forEach((edata) => {
      layout.entities.set(edata.id, entityManager.model.getEntity(edata))
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

    if (layoutData.groupings) {
      layoutData.groupings.forEach((gdata) => {
        const grouping = Grouping.fromJSON(layout, gdata)
        layout.groupings.set(grouping.id, grouping)
      })
    } else {
      layout.groupings = new Map()
    }

    layout.selection = layoutData.selection || []

    return layout
  }
}
