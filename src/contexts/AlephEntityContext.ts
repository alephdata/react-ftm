import has from 'lodash/has'
import {
  Entity,
  Model,
  IEntityDatum,
	Schema
} from '@alephdata/followthemoney';

import { IEntityContext } from 'contexts/EntityContext';

export interface IAlephEntityContext extends IEntityContext {
  fetchEntities: () => void

	expandEntity: (entityId: string, properties?: Array<string>, limit?: number) => void
	selectEntityExpandResult: (state: any, expandQuery: any) => any

	queryEntitySuggest: (queryText: string, schemata?: Array<Schema>) => void
	selectEntitiesResult: (state: any, query: any) => any
}
