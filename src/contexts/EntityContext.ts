import has from 'lodash/has'
import {
  Entity,
  Model,
  IEntityDatum,
	Schema
} from '@alephdata/followthemoney';
// import { selectResult } from 'contexts/util';

export interface IEntityContext {
  selectModel: (state: any) => Model,
	selectLocale: (state: any) => string,

	createEntity: (model: Model, entity: IEntityDatum) => void,
  updateEntity: (entity: IEntityDatum) => void,
  deleteEntity: (entityId: string) => void,
	selectEntity: (state: any, entityId: string) => Entity | null
	selectEntities: (state: any) => Array<Entity>
}
