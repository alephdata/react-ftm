import has from 'lodash/has'
import {
  Entity,
  Model,
  IEntityDatum,
	Schema
} from '@alephdata/followthemoney';
import { createAction } from 'redux-act'

import { IEntityContext } from 'contexts/EntityContext';
import { createEntity, deleteEntity, updateEntity } from 'actions/localStorageActions';

export interface ILocalStorageEntityContext extends IEntityContext {}

export class LocalStorageEntityContext {
	selectModel = (state: any) => state.model
  selectLocale = (state: any) => state.locale

  createEntity = createEntity
  updateEntity = updateEntity
  deleteEntity = deleteEntity

	selectEntity(state: any, entityId: string) {
		const { entities } = state;
		const model = this.selectModel(state);
		if (!model || !entityId || !has(entities, entityId)) {
			return null;
		}
		return model.getEntity(entities[entityId]);
	}

	selectEntities(state: any) {
		const model = this.selectModel(state);
		return state.entities.map((eData: IEntityDatum) => model.getEntity(eData));
	}
}
