import { Schema } from './schema'
import { IPropertyDatum } from './property'
import { Entity } from './entity'

interface ISchemata {
  [schemaName: string]: {}
}

interface ISchemaList {
  [schemaName: string]: Schema
}

interface ISchemaDatum {
  label: string
  required: boolean
  plural: string
  uri: string
  schemata: string[]
  extends: string[]
  abstract: boolean
  matchable: boolean
  description: string | null
  featured: string[]
  properties: {
    [x: string]: IPropertyDatum
  }
}
export interface ISchemataDatum {
  [schemaName: string]: ISchemaDatum
}

// export default class Model {
//     private schemaCache: ISchemaList = {};
//     private readonly schemata: ISchemata = {};
//
//     constructor(schemeta: ISchemata) {
//         this.schemata = schemeta;
//     }
//
//     getInstance() {
//         return Object.entries(this.schemata)
//             .reduce(function (reducer, [schemaName, schemaImplementation]) {
//                 return Object.assign(reducer, {
//                     [schemaName]: new Schema(schemaName, schemaImplementation)
//                 })
//             }, {})
//     }

// _getInstance() {
//   return new Proxy(this.schemata, {
//     get: (schemata: ISchemata, schemaName: string): Schema => {
//       if (this.schemaCache[schemaName]) {
//         return this.schemaCache[schemaName];
//       } else if (Object.keys(schemata).length) {
//         const schema = schemata[schemaName];
//         if (schema) {
//           return this.schemaCache[schemaName] = new Schema(schemaName, schema);
//         }
//       } else {
//         console.error(
//           new Error(`Provide schemas implementation firs via 'Model.constructor' function`)
//         )
//       }
//       return {};
//     }
//   });
// }
// }

interface ISchemeta {
  [schemaName: string]: {}
}

export class Model {
  private readonly schemaCache: { [x: string]: Schema } = {}
  public readonly schemata: any

  constructor(schemata: ISchemataDatum) {
    this.schemata = schemata
  }

  getSchema(schemaName: string): Schema {
    if (this.schemaCache[schemaName]) {
      return this.schemaCache[schemaName]
    } else {
      return (this.schemaCache[schemaName] = new Schema(schemaName, this.schemata[schemaName]))
    }
  }
  emit(schemaName: string, entity?: any) {
    return this.emitEntity({
      schema: schemaName,
      ...entity
    })
  }

  emitEntity(entity: any): Entity {
    if (entity.schema) {
      return Entity.generate(entity.schema, this, entity)
    }
    throw new Error('no schem description found')
  }
}
