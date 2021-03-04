import includes from 'lodash/includes'
import {
  Entity,
	Schema
} from '@alephdata/followthemoney';

import { matchText } from 'utils';
import { createEntity, deleteEntity, updateEntity, queryEntities } from 'actions/localStorageActions';
import { loadComplete } from 'contexts/util';

export class LocalStorageEntityContext {
	selectModel = (state: any) => state.model
  selectLocale = (state: any) => state.locale

  createEntity = createEntity
  updateEntity = updateEntity
  deleteEntity = deleteEntity

	selectEntity = (state: any, entityId: string) => {
		return state.entities.find((e: Entity) => e.id === entityId);
	}

  queryEntities = queryEntities
  selectEntities = (state: any, queryText?: string, schemata?: Array<Schema>) => {
    const { entities } = state;
    if (!queryText && !schemata) {
      return loadComplete({ results: entities });
    } else {
      const predicate = (e: Entity) => {
        const schemaMatch = !schemata || e.schema.isAny(schemata);
        const textMatch = !queryText || matchText(e.getCaption() || '', queryText);
        return schemaMatch && textMatch;
      }
      return loadComplete({ results: entities.filter(predicate) });
    }
  }
}
