import has from 'lodash/has'
import {
  Entity,
  Model,
  IEntityDatum,
	Schema
} from '@alephdata/followthemoney';
// import { selectResult } from 'contexts/util';

export interface ILocalStorageEntityContext {
  selectModel: (state: any) => Model,
	selectLocale: (state: any) => string,

	createEntity: (entity: IEntityDatum) => void,
  updateEntity: (entity: Entity) => void,
  deleteEntity: (entityId: string) => void,
	selectEntity: (state: any, entityId: string) => Entity | null

	fetchEntities: () => void
	selectEntities: (state: any) => Array<Entity>
}

export interface IAlephEntityContext extends ILocalStorageEntityContext {
	expandEntity: (entityId: string, properties?: Array<string>, limit?: number) => void
	selectEntityExpandResult: (state: any, expandQuery: any) => any

	queryEntitySuggest: (queryText: string, schemata?: Array<Schema>) => void
	selectEntitiesResult: (state: any, query: any) => any
}

export type IEntityContext = ILocalStorageEntityContext | IAlephEntityContext


export class LocalStorageEntityContext {
	selectModel(state: any) {
		return state.model;
	}

	selectLocale(state: any) {
		return state.locale;
	}

	createEntity(entity: IEntityDatum) {

	}
  updateEntity(entity: Entity) {

	}
  deleteEntity(entityId: string) {

	}

	selectEntity(state: any, entityId: string) {
		const { entities } = state;
		const model = this.selectModel(state);
		if (!model || !entityId || !has(entities, entityId)) {
			return null;
		}
		return model.getEntity(entities[entityId]);
	}

	fetchEntities() {

	}

	selectEntities(state: any) {
		const model = this.selectModel(state);
		return state.entities.map((eData: IEntityDatum) => model.getEntity(eData));
	}
}


