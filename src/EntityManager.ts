import { defaultModel, Entity, Model, Namespace, Schema, IEntityDatum } from '@alephdata/followthemoney'


export interface IEntityManagerProps {
  model?: Model,
  namespace?: Namespace,
  createEntity?: (entity: IEntityDatum) => Entity,
  updateEntity?: (entity: Entity) => void,
  deleteEntity?: (entityId: string) => void,
  expandEntity?: (entityId: string, properties?: Array<string>) => Promise<any>
  getEntitySuggestions?: (queryText: string, schemata?: Array<Schema>) => Promise<Entity[]>,
  resolveEntityReference?: (entityId: string) => Entity | undefined,
}

export class EntityManager {
  public readonly model: Model
  public readonly namespace?: Namespace
  public readonly hasExpand: boolean = false
  private overload: any

  constructor(props?: IEntityManagerProps) {
    if (props) {
      const { model, namespace, ...rest } = props;
      this.model = model || new Model(defaultModel)
      this.namespace = namespace
      this.overload = rest;
      this.hasExpand = this.overload.expandEntity !== undefined;
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

  updateEntity(entity: Entity) {
    if (this.overload?.updateEntity) {
      this.overload.updateEntity(entity);
    }
  }

  deleteEntity(entityId: string) {
    if (this.overload?.deleteEntity) {
      this.overload.deleteEntity(entityId);
    }
  }

  async expandEntity(entityId: string, properties?: Array<string>) {
    console.log('in ent manager expand entity', entityId);
    if (this.overload?.expandEntity) {
      const expandResults = await this.overload.expandEntity(entityId, properties);
      console.log('expandResults are', expandResults);
      return expandResults;
    }
  }

  resolveEntityReference(entityId: string) {
    if (this.overload?.resolveEntityReference) {
      return this.overload.resolveEntityReference(entityId);
    }
  }

  async getEntitySuggestions(queryText: string, schemata?: Array<Schema>) {
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
