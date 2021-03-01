import remove from 'lodash/remove';
import findIndex from 'lodash/findIndex';
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
      const index = findIndex(state, { id: entity.id })
      state.splice(index, 1, entity);
      console.log('STAET', state)
      return state;
    })
    .on(deleteEntity, (state: Array<Entity>, entityId: string) => {
      remove(state, { id: entityId });
      return state;
    })
  return entitiesReducer;
}

export default createEntitiesReducer;
