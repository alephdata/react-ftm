import remove from 'lodash/remove';
import { createReducer } from 'redux-act';
import { combineReducers, createStore } from 'redux';
import {
  defaultModel,
  IEntityDatum,
  Model,
} from '@alephdata/followthemoney';

import { createEntity, deleteEntity, updateEntity } from 'actions/localStorageActions'


export const createLocalStorageReducer = (data: any) => {
  const entitiesReducer = createReducer({}, data.entities);

  entitiesReducer
    .on(createEntity, (state: Array<IEntityDatum>, entityData: IEntityDatum) => {
      return [...state, entityData];
    })
    .on(updateEntity, (state: Array<IEntityDatum>, entityData: IEntityDatum) => {
      return state;
    })
    .on(deleteEntity, (state: Array<IEntityDatum>, entityId: string) => {
      return remove(state, {
        id: entityId
      });
    })

  return combineReducers({
    model: createReducer({}, new Model(defaultModel)),
    locale: createReducer({}, 'de'),
    entities: entitiesReducer,
  });
}
