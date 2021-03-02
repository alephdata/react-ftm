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

	selectEntities = (state: any, ids?: Array<string>) => {
    const entities = state.entities;
    if (ids) {
      return entities.filter((e: Entity) => includes(ids, e.id)) as Entity[];
    } else {
      return entities;
    }
	}

  queryEntities = queryEntities
  selectEntitiesResult = (state: any, queryText: string, schemata?: Array<Schema>) => {
    const predicate = (e: Entity) => {
      const schemaMatch = !schemata || e.schema.isAny(schemata);
      const textMatch = matchText(e.getCaption() || '', queryText);
      return schemaMatch && textMatch;
    }

    const results = this.selectEntities(state)
      .filter(predicate);

    return loadComplete({ results });
  }
}
