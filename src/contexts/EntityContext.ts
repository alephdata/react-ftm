import has from 'lodash/has'
import {
  Entity,
  Model,
  IEntityDatum,
	Schema
} from '@alephdata/followthemoney';

type ResultType = {
  shouldLoad: boolean
  isPending: boolean
  isError: boolean
}

type EntityResultType = ResultType & {
  results: Array<Entity>
}

type EntityExpandObjectType = {
  count: number
  property: string
  entities: Array<Entity>
}

type EntityExpandResultType = ResultType & {
  results: Array<EntityExpandObjectType>
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

  queryEntityExpand?: (entityId: string, properties?: Array<string>, limit?: number) => void
  selectEntityExpandResult?: (state: any, entityId: string, properties?: Array<string>, limit?: number) => EntityExpandResultType
}
