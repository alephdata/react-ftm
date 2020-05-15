import { defaultModel, Entity, Model, Schema, IEntityDatum } from '@alephdata/followthemoney'


export interface IEntityManagerProps {
  model?: Model,
  createEntity?: (entityData: IEntityDatum) => Promise<Entity>,
  updateEntity?: (entity: Entity) => void,
  deleteEntity?: (entityId: string) => void,
  getEntitySuggestions?: (queryText: string, schemata?: Array<Schema>) => Promise<Entity[]>,
  resolveEntityReference?: (entityId: string) => Entity | undefined,
}

export class EntityManager {
  public readonly model: Model
  private overload: any

  constructor(props?: IEntityManagerProps) {
    if (props) {
      const { model, ...rest } = props;
      this.model = model || new Model(defaultModel)
      this.overload = rest;
    } else {
      this.model = new Model(defaultModel);
    }

    this.getEntitySuggestions = this.getEntitySuggestions.bind(this);
    this.resolveEntityReference = this.resolveEntityReference.bind(this);
  }

  async createEntity(entityData: any) {
    if (this.overload?.createEntity) {
      const entity = await this.overload.createEntity(entityData);
      return entity;
    } else {
      const { schema, properties } = entityData;
      const entity = this.model.createEntity(schema);
      if (properties) {
        Object.entries(properties).forEach(([prop, value]: [string, any]) => {
          if (Array.isArray(value)) {
            value.forEach(v => entity.setProperty(prop, v));
          } else {
            entity.setProperty(prop, value);
          }
        });
      }

      return entity;
    }
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
