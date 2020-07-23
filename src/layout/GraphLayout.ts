import { Entity, IEntityDatum, Schema } from '@alephdata/followthemoney'
import { forceSimulation, forceLink, forceCollide } from 'd3-force';
import { DraggableEvent } from 'react-draggable';
import { Vertex } from './Vertex'
import { Edge } from './Edge'
import { Grouping } from './Grouping'
import { Point } from './Point';
import { Rectangle } from './Rectangle';
import { forceLayout } from './';
import { EntityManager } from '../EntityManager';
import { ISettingsData, Settings } from './Settings';
import { GraphConfig } from '../GraphConfig';
import { matchText } from "../utils";

export interface IGraphLayoutData {
  entities: Array<IEntityDatum>
  vertices: Array<any>
  edges: Array<any>
  groupings?: Array<any>
  selection?: Array<string>
  settings: ISettingsData
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
  settings = new Settings()
  private hasDraggedSelection = false

  constructor(config: GraphConfig, entityManager: EntityManager) {
    this.config = config;
    this.entityManager = entityManager;

    this.addVertex = this.addVertex.bind(this);
    this.addEdge = this.addEdge.bind(this);
    this.addEntities = this.addEntities.bind(this);
    this.createEntity = this.createEntity.bind(this);
    this.removeEntity = this.removeEntity.bind(this);
    this.getEntitySuggestions = this.getEntitySuggestions.bind(this);
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

  getVisibleElementCount(): any {
    return {
      vertices: this.getVertices().filter(v => !v.isHidden()).length,
      edges: this.getEdges().filter(e => !e.isHidden()).length,
      groupings: this.getGroupings().length,
    }
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
            if (!sourceVertex) { return; }
            this.addVertex(sourceVertex)
            const targetVertex = Vertex.fromValue(this, targetProperty, target)
            if (!targetVertex) { return; }
            this.addVertex(targetVertex)
            this.addEdge(Edge.fromEntity(this, entity, sourceVertex, targetVertex))
          })
        })
      } else {
        const mainVertex = Vertex.fromEntity(this, entity);
        this.addVertex(mainVertex)

        const properties = entity.getProperties()
        // removing properties which should not be represented as a vertex
          .filter(property => this.settings.hasPivotType(property.type.name));

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
              if (!propertyVertex) { return; }
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
    return this.entityManager.createEntity(entityData);
  }

  addEntities(entities: Array<Entity>, center?: Point) {
    entities.map(e => this.entities.set(e.id, e));
    this.layout(center);
    this.selectByEntities(entities);
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
        this.groupings.delete('selectedArea');
      } else if (!isAlreadySelected) {
        this.selection = [...this.selection, ...newSelection]
      }
    }
  }

  selectVerticesByFilter(predicate: VertexPredicate, additional: boolean = false, allowUnselect: boolean = false) {
    const vertices = this.getVertices().filter((vertex) => !vertex.isHidden()).filter(predicate);
    this.selectElement(vertices, additional, allowUnselect);
  }

  selectByEntities(entities: Array<Entity>, additional: boolean = false, allowUnselect: boolean = false) {
    const entityIds = entities.map(e => e.id);
    this.selectVerticesByFilter(v => (v.entityId !== undefined && entityIds.indexOf(v.entityId) > -1), additional, allowUnselect);
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

  getEntitySuggestions(query: string, schemata?: Array<Schema>): Promise<Entity[]> {
    const predicate = (e: Entity) => {
      const schemaMatch = !schemata || e.schema.isAny(schemata);
      const textMatch = matchText(e.getCaption() || '', query);
      return schemaMatch && textMatch;
    }

    const entities = this.getEntities()
      .filter(predicate)
      .sort((a, b) => a.getCaption().toLowerCase() > b.getCaption().toLowerCase() ? 1 : -1);

    return new Promise((resolve) => resolve(entities));
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
    return this.getAdjacentEdges(this.selection)
  }

  getAdjacentEdges(vertices: Array<string>): Edge[] {
    return this.getEdges().filter((e: Edge) => this.isEdgeAdjacent(e, vertices))
  }

  hasSelection(): boolean {
    return this.selection.length > 0
  }

  clearSelection() {
    this.selection = [];
    this.groupings.delete('selectedArea');
  }

  isElementSelected = (element: GraphElement | Array<GraphElement>) => {
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
    return this.isElementSelected(edge) || this.isEdgeAdjacent(edge, this.selection)
  }

  isEdgeAdjacent(edge: Edge, vIds:Array<string>): boolean {
    if (!vIds?.length) return false;
    return vIds.indexOf(edge.sourceId) !== -1 ||
      vIds.indexOf(edge.targetId) !== -1;
  }

  applyPositioning(positioningFuncs: any, vertices: Array<Vertex>, maintainFixed: boolean = false) {
    const { positionVertex, positionEdge } = positioningFuncs;
    const vIds = vertices.map(v => v.id);
    vertices.forEach((v, i) => {
      const position = positionVertex(v, i);
      if (position) {
        this.vertices.set(v.id, v.snapPosition(position));
      }
    });

    let adjEdges = this.getAdjacentEdges(vIds);
    if (maintainFixed) {
      adjEdges = adjEdges.filter((e) => (!this.vertices.get(e.sourceId)?.fixed || !this.vertices.get(e.targetId)?.fixed))
    }

    adjEdges.forEach((e, i) => {
        const position = positionEdge ? positionEdge(e, i) : undefined;
        this.edges.set(e.id, e.setLabelPosition(position))
      });
    return this;
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

  layout(center?: Point) {
    this.generate()
    const vertices = this.getVertices().filter(v => !v.isHidden())
    const edges = this.getEdges();
    const groupings = this.getGroupings();
    const positioningFunc = forceLayout({vertices, edges, groupings, options:{ center, maintainFixed: true }});
    this.applyPositioning(positioningFunc, vertices, true);
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
      selection: this.selection,
      settings: this.settings.toJSON(),
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
    layout.settings = Settings.fromJSON(layoutData.settings);

    layout.layout()

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
