import { IEntityContext } from 'contexts/IEntityContext'

export class AlephEntityContext {
  constructor(attributes: IEntityContext) {
    for (const key in attributes) {
      this[key] = attributes[key];
    }
  }
}
