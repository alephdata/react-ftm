import _ from 'lodash'
import { Values } from '@alephdata/followthemoney';


export function ensureArray(values: Values) {
  if (_.isNil(values)) {
    return [];
  }
  return _.castArray(values);
}
