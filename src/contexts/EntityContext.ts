import has from 'lodash/has'
import {
  Entity,
  Model,
  IEntityDatum,
	Schema
} from '@alephdata/followthemoney';
// import { selectResult } from 'contexts/util';

type EntityResultType = {
  isPending: boolean
  shouldLoad: boolean
  results: Array<Entity>
}

export interface IEntityContext {
  selectModel: (state: any) => Model,
	selectLocale: (state: any) => string,

	createEntity: (model: Model, entity: IEntityDatum) => void,
  updateEntity: (entity: IEntityDatum) => void,
  deleteEntity: (entityId: string) => void,
	selectEntity: (state: any, entityId: string) => Entity | null
	selectEntities: (state: any) => Array<Entity>

  queryEntities: (queryText: string, schemata?: Array<Schema>) => void
  queryEntitySuggest?: (queryText: string, schemata?: Array<Schema>) => void
	selectEntitiesResult: (state: any, queryText: string, schemata?: Array<Schema>) => EntityResultType
}
