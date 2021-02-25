import {
  Entity,
} from '@alephdata/followthemoney';

export type ResultType = {
  shouldLoad: boolean
  isPending: boolean
  isError: boolean
}

export type EntitiesResultType = ResultType & {
  results: Array<Entity>
}

export type EntityExpandObjectType = {
  count: number
  property: string
  entities: Array<Entity>
}

export type EntityExpandResultType = ResultType & {
  results: Array<EntityExpandObjectType>
}
