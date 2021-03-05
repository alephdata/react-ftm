import { Entity, Model, Schema } from '@alephdata/followthemoney';
import { EntitiesResultType, EntityExpandResultType } from 'contexts/util'

export interface IEntityContext {
  selectModel: (state: any) => Model,
	selectLocale: (state: any) => string,

	createEntity: (model: Model, entityData: any) => void,
  updateEntity: (entity: Entity) => void,
  deleteEntity: (entityId: string) => void,
	selectEntity: (state: any, entityId: string) => Entity | undefined

  queryEntities: (queryText?: string, schemata?: Array<Schema>) => void
  selectEntities: (state: any, queryText?: string, schemata?: Array<Schema>) => EntitiesResultType

  queryEntitySuggest?: (queryText: string, schemata?: Array<Schema>) => void
	selectEntitySuggestResult?: (state: any, queryText: string, schemata?: Array<Schema>) => EntitiesResultType

  queryEntityExpand?: (entityId: string, properties?: Array<string>, limit?: number) => void
  selectEntityExpandResult?: (state: any, entityId: string, properties?: Array<string>, limit?: number) => EntityExpandResultType
}
