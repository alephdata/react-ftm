import remove from 'lodash/remove';
import { createReducer } from 'redux-act';
import {
  defaultModel,
  IEntityDatum,
  Entity,
  Model,
} from '@alephdata/followthemoney';

import { createEntity, deleteEntity, updateEntity } from 'actions/localStorageActions'

const createEntitiesReducer = (entities: Array<Entity>) => {
  const entitiesReducer = createReducer({}, entities);

  entitiesReducer
    .on(createEntity, (state: Array<Entity>, entity: Entity) => {
      return [...state, entity];
    })
    .on(updateEntity, (state: Array<Entity>, entity: Entity) => {
      return state;
    })
    .on(deleteEntity, (state: Array<Entity>, entityId: string) => {
      return remove(state, {
        id: entityId
      });
    })
  return entitiesReducer;
}

export default createEntitiesReducer;
