import {
  defaultModel,
  Entity,
  Model,
  Namespace,
  PropertyType,
  Schema,
  IEntityDatum
} from '@alephdata/followthemoney'


export interface IEntityManagerProps {
  model?: Model,
  entities: Array<IEntityDatum>
  namespace?: Namespace,
  createEntity?: (entity: IEntityDatum) => Entity,
  updateEntity?: (entity: Entity) => void,
  deleteEntity?: (entityId: string) => void,
  expandEntity?: (entityId: string, properties?: Array<string>, limit?: number) => Promise<any>
  getEntitySuggestions?: (queryText: string, schemata?: Array<Schema>) => Promise<Entity[]>,
  resolveEntityReference?: (entityId: string) => Entity | undefined,
}

export class EntityManager {
  public readonly model: Model
  public readonly namespace?: Namespace
  public readonly hasExpand: boolean = false
  public readonly hasSuggest: boolean = false
  private overload: any = {}

  constructor(props?: IEntityManagerProps) {
    if (props) {
      const { model, namespace, ...rest } = props;
      this.model = model || new Model(defaultModel)
      this.namespace = namespace
      this.overload = rest;
      this.hasExpand = this.overload.expandEntity !== undefined;
      this.hasSuggest = this.overload.getEntitySuggestions !== undefined;
    } else {
      this.model = new Model(defaultModel);
    }

    this.getEntitySuggestions = this.getEntitySuggestions.bind(this);
    this.resolveEntityReference = this.resolveEntityReference.bind(this);
  }

  createEntity(entityData: any) {
    let entity: Entity;
    if (entityData.id) {
      entity = entityData;
    } else {
      const { properties, schema } = entityData;

      entity = this.model.createEntity(schema, this.namespace);

      if (properties) {
        Object.entries(properties).forEach(([prop, value]: [string, any]) => {
          if (Array.isArray(value)) {
            value.forEach(v => entity.setProperty(prop, v));
          } else {
            entity.setProperty(prop, value);
          }
        });
      }
    }

    if (this.overload?.createEntity) {
      this.overload.createEntity(entity);
    }
    return entity;
  }

  getEntities(): Entity[] {
    return Array.from(this.entities.values())
  }

  hasEntity(entity: Entity): boolean {
    return this.entities.has(entity.id);
  }

  addEntities(entities: Array<Entity>) {
    entities.map(e => this.entities.set(e.id, e));
  }

  removeEntities(entityIds: Array<string>, propagate?: boolean) {
    entities.map(e => {
      this.entities.delete(entityId);
      if (propagate) {
        this.deleteEntity(entityId, true);
      }
    });
  }

  updateEntity(entity: Entity) {
    this.entities.set(entity.id, entity)

    if (this.overload?.updateEntity) {
      this.overload.updateEntity(entity);
    }

    return entity;
  }

  deleteEntity(entityId: string, propagate?: boolean) {
    if (propagate && this.overload?.deleteEntity) {
      this.overload.deleteEntity(entityId);
    }
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

  async getEntitySuggestions(local: boolean, queryText: string, schemata?: Array<Schema>) {
    if (local) {
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

    if (this.overload?.getEntitySuggestions) {
      const suggestions = await this.overload.getEntitySuggestions(queryText, schemata);
      return suggestions;
    }
    return [];
  }

  // entity changes in the reverse direction require undoing create/delete operations
  applyEntityChanges(entityChanges: any, factor: number) {
    const { created, updated, deleted } = entityChanges;

    created && created.forEach((entity: Entity) => factor > 0 ? this.updateEntity(entity) : this.deleteEntity(entity.id));
    updated && updated.forEach((entity: Entity) => this.updateEntity(entity));
    deleted && deleted.forEach((entity: Entity) => factor > 0 ? this.deleteEntity(entity.id) : this.updateEntity(entity));
  }
}
