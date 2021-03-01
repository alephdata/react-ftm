import {
  defaultModel,
  Entity,
  Model,
  Namespace,
  Schema,
  IEntityDatum
} from '@alephdata/followthemoney'

import { EntityChanges, EntityChangeUpdate } from 'components/common/types';
import { matchText } from 'utils';


export interface IEntityManagerProps {
  entities: Array<IEntityDatum>
  namespace?: Namespace,
  updateEntity?: (entity: Entity) => void,
  expandEntity?: (entityId: string, properties?: Array<string>, limit?: number) => Promise<any>
  resolveEntityReference?: (entityId: string) => Entity | undefined,
}

export class EntityManager {
  public readonly namespace?: Namespace
  public readonly hasExpand: boolean = false
  entities = new Map<string, Entity>()
  private overload: any = {}

  constructor(props?: IEntityManagerProps) {
    if (props) {
      const { namespace, ...rest } = props;
      this.namespace = namespace
      this.overload = rest;
      this.hasExpand = this.overload.expandEntity !== undefined;
    }

    this.getEntity = this.getEntity.bind(this);
    this.getEntities = this.getEntities.bind(this);
    this.resolveEntityReference = this.resolveEntityReference.bind(this);
  }

  getEntities(ids?: Array<string>): Entity[] {
    if (ids) {
      return ids.map(id => this.getEntity(id)).filter(e => e !== undefined) as Entity[];
    } else {
      return Array.from(this.entities.values());
    }
  }

  getThingEntities(): Entity[] {
    return this.getEntities().filter(e => !e.schema.edge);
  }

  getEntity(entityId: string): Entity | undefined {
    return this.entities.get(entityId);
  }

  hasEntity(entity: Entity): boolean {
    return this.entities.has(entity.id);
  }

  addEntities(entities: Array<Entity>) {
    entities.map(e => this.entities.set(e.id, e));
  }

  updateEntity(entity: Entity) {
    this.entities.set(entity.id, entity)

    if (this.overload?.updateEntity) {
      this.overload.updateEntity(entity);
    }

    return entity;
  }

  async expandEntity(entityId: string, properties?: Array<string>, limit?: number) {
    if (this.overload?.expandEntity) {
      const expandResults = await this.overload.expandEntity(entityId, properties, limit);
      return expandResults;
    }
  }

  resolveEntityReference(entityId: string) {
    if (this.overload?.resolveEntityReference) {
      return this.overload.resolveEntityReference(entityId);
    }
  }

  // entity changes in the reverse direction require undoing create/delete operations
  applyEntityChanges(entityChanges: EntityChanges, factor: number) {
    const { created, updated, deleted } = entityChanges;

    // created && created.forEach((entity: Entity) => factor > 0 ? this.createEntity(entity) : this.deleteEntities([entity.id]));
    updated && updated.forEach(({prev, next}: EntityChangeUpdate) => factor > 0 ? this.updateEntity(next) : this.updateEntity(prev));
    // deleted && deleted.forEach((entity: Entity) => factor > 0 ? this.deleteEntities([entity.id]) : this.createEntity(entity));
  }

  toJSON(): Array<IEntityDatum> {
    return this.getEntities().map(entity => entity.toJSON());
  }

  static fromJSON(props: any, entitiesData: Array<IEntityDatum>): EntityManager {
    const entityManager = new EntityManager(props);
    const model = new Model(defaultModel);

    const entities = entitiesData.map((entityDatum: IEntityDatum) => new Entity(model, entityDatum));

    entityManager.addEntities(entities);

    return entityManager
  }
}
