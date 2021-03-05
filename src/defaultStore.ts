import { defaultModel, IEntityDatum, Model } from '@alephdata/followthemoney';
import { createReducer } from 'redux-act';
import { combineReducers, createStore } from 'redux';

import createEntitiesReducer from 'reducers/entitiesReducer'


export const createDefaultStore = (initialData: any, onUpdate?: (updatedData: any) => void) => {
  const { model, locale, entities } = initialData;

  const _model = model || new Model(defaultModel);

  const store = createStore(
    combineReducers({
      model: createReducer({}, _model),
      locale: createReducer({}, locale || 'en'),
      entities: createEntitiesReducer(entities ? entities.map((eData: IEntityDatum) => _model.getEntity(eData)) : []),
    })
  );
  if (onUpdate) {
    store.subscribe(() => {
      const { entities } = store.getState()
      onUpdate({ entities });
    });
  }
  return store;
}
