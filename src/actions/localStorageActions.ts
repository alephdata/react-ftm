import { createAction } from 'redux-act'
import {
  Entity,
  Model,
  IEntityDatum,
  Schema,
} from '@alephdata/followthemoney';


export const createEntity = createAction('CREATE_ENTITY', (model: Model, entityData: IEntityDatum) => {
  if (entityData.id) {
    return entityData;
  } else {
    const { properties, schema } = entityData;
    const entity = model.createEntity(schema);
    if (properties) {
      Object.entries(properties).forEach(([prop, value]: [string, any]) => {
        if (Array.isArray(value)) {
          value.forEach(v => entity.setProperty(prop, v));
        } else {
          entity.setProperty(prop, value);
        }
      });
    }
    return entity.toJSON();
  }
});

export const updateEntity = createAction('UPDATE_ENTITY', (entityData: IEntityDatum) => entityData)

export const deleteEntity = createAction('DELETE_ENTITY', (entityId: string) => entityId)

export const queryEntities = createAction('QUERY_ENTITIES', (queryText: string, schemata?: Array<Schema>) => ({ queryText, schemata }))
