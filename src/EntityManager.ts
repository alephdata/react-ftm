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
    console.log('ENTITY MANAGER: create')
    if (this.overload?.createEntity) {
      return this.overload.createEntity(entityData)
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

  updateEntity(entity: Entity) {
    console.log('ENTITY MANAGER: update')

    if (this.overload?.updateEntity) {
      return this.overload.updateEntity(entity);
    } else {
      return entity;
    }
  }

  async deleteEntity(entityId: string) {
    console.log('ENTITY MANAGER: delete')

    if (this.overload?.deleteEntity) {
      const status = await this.overload.deleteEntity(entityId);
      return status;
    } else {
      return true;
    }
  }

  // entity changes in the reverse direction require undoing create/delete operations
  applyEntityChanges(entityChanges: any, factor: number) {
    const { created, updated, deleted } = entityChanges;

    created && created.forEach((entity: Entity) => factor > 0 ? this.createEntity(entity) : this.deleteEntity(entity.id));
    updated && updated.forEach((entity: Entity) => this.updateEntity(entity));
    deleted && deleted.forEach((entity: Entity) => factor > 0 ? this.deleteEntity(entity.id) : this.createEntity(entity));
  }
}
