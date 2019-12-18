import { defaultModel, Entity, Model, IEntityDatum } from '@alephdata/followthemoney'


export interface IEntityManagerOverload {
  createEntity?: (entityData: IEntityDatum) => Entity,
  updateEntity?: (entity: Entity) => Entity,
  deleteEntity?: (entityId: string) => void,
}

export class EntityManager {
  public readonly model: Model
  private overload: IEntityManagerOverload | undefined

  constructor(props?: IEntityManagerOverload) {
    this.model = new Model(defaultModel);
    this.overload = props;
  }

  createEntity(entityData: any) {
    if (this.overload?.createEntity) {
      return this.overload.createEntity(entityData);
    } else {
      const { schema, properties } = entityData;
      const entity = this.model.createEntity(schema);
      Object.entries(properties).forEach(([prop, value]: [string, any]) => (
        entity.setProperty(prop, value)
      ));
      return entity;
    }
  }

  updateEntity(entity: Entity) {
    if (this.overload?.updateEntity) {
      return this.overload.updateEntity(entity);
    } else {
      return entity;
    }
  }

  deleteEntity(entityId: string) {
    if (this.overload?.deleteEntity) {
      this.overload.deleteEntity(entityId);
    }
  }
}
