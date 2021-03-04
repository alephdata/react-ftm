import { IEntityContext } from 'contexts/EntityContext'

export class AlephEntityContext {
  constructor(attributes: IEntityContext) {
    for (let key in attributes) {
      this[key] = attributes[key];
    }
  }
}
