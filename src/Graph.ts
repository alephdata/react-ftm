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

export interface IGraphData {
  entities: Array<IEntityDatum>
}

export class Graph {
  constructor(config: GraphConfig, entityManager: EntityManager) {
    this.config = config;
    this.entityManager = entityManager;

    this.addEntities = this.addEntities.bind(this);
    this.createEntity = this.createEntity.bind(this);
    this.removeEntity = this.removeEntity.bind(this);
    this.getEntitySuggestions = this.getEntitySuggestions.bind(this);
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

  clone():GraphLayout{
    return this.update(this.toJSON());
  }

  update(withData:IGraphLayoutData):GraphLayout{
    return GraphLayout.fromJSON(this.config, this.entityManager, withData)
  }

  toJSON(): IGraphData {
    return {
      entities: this.getEntities().map((entity) => entity.toJSON()),
      layout: this.layout.toJSON()
    }
  }

  static fromJSON(config: GraphConfig, entityManager: EntityManager, graphData: IGraphData): Graph {
    const { entities, layout } = graphData;
    const graph = new Graph(config, entityManager);

    entities.forEach((edata) => {
      graph.entities.set(edata.id, entityManager.model.getEntity(edata))
    })

    graph.layout = GraphLayout.fromJSON(config, layout)

    // layout.layout()

    return graph;
  }
}
