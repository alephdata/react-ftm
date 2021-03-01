import has from 'lodash/has'
import {
  Entity,
  Model,
  IEntityDatum,
	Schema
} from '@alephdata/followthemoney';
import { EntitiesResultType, EntityExpandResultType } from 'contexts/util'

export interface IEntityContext {
  selectModel: (state: any) => Model,
	selectLocale: (state: any) => string,

	createEntity: (model: Model, entityData: any) => void,
  updateEntity: (entity: Entity) => void,
  deleteEntity: (entityId: string) => void,
	selectEntity: (state: any, entityId: string) => Entity | undefined
	selectEntities: (state: any, ids?: Array<string>) => Array<Entity>

  queryEntities: (queryText: string, schemata?: Array<Schema>) => void
  queryEntitySuggest?: (queryText: string, schemata?: Array<Schema>) => void
	selectEntitiesResult: (state: any, queryText: string, schemata?: Array<Schema>) => EntitiesResultType

  queryEntityExpand?: (entityId: string, properties?: Array<string>, limit?: number) => void
  selectEntityExpandResult?: (state: any, entityId: string, properties?: Array<string>, limit?: number) => EntityExpandResultType
}
