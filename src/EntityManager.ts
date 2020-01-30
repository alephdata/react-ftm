import { defaultModel, Entity, Model, IEntityDatum } from '@alephdata/followthemoney'


export interface IEntityManagerOverload {
  createEntity?: (entityData: IEntityDatum) => IEntityDatum,
  undeleteEntity?: (entity: Entity) => void,
  updateEntity?: (entity: Entity) => void,
  deleteEntity?: (entityId: string) => void,
}

export class EntityManager {
  public readonly model: Model
  private overload: IEntityManagerOverload | undefined

  constructor(props?: IEntityManagerOverload) {
    this.model = new Model(defaultModel);
    this.overload = props;
  }

  async createEntity(entityData: any) {
    if (this.overload?.createEntity) {
      const entityWithId: IEntityDatum = await this.overload.createEntity(entityData);
      return new Entity(this.model, entityWithId);
    } else {
      const { schema, properties } = entityData;
      const entity = this.model.createEntity(schema);
      if (properties) {
        Object.entries(properties).forEach(([prop, value]: [string, any]) => (
          entity.setProperty(prop, value)
        ));
      }

      return entity;
    }
  }

  async undeleteEntity(entity: Entity) {
    if (this.overload?.undeleteEntity) {
      await this.overload.undeleteEntity(entity);
    }
  }

  async updateEntity(entity: Entity) {
    if (this.overload?.updateEntity) {
      await this.overload.updateEntity(entity);
    }
  }

  async deleteEntity(entityId: string) {
    if (this.overload?.deleteEntity) {
      await this.overload.deleteEntity(entityId);
    }
  }

  applyEntityChanges(entityChanges: any, factor: number) {
    const { created, updated, deleted } = entityChanges;

    created && created.forEach((entity: Entity) => factor > 0 ? this.undeleteEntity(entity) : this.deleteEntity(entity.id));
    updated && updated.forEach((entity: Entity) => this.updateEntity(entity));
    deleted && deleted.forEach((entity: Entity) => factor > 0 ? this.deleteEntity(entity.id) : this.undeleteEntity(entity));
  }
}
