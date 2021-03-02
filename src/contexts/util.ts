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

export const loadState = () => {
  return {
    isPending: true,
    shouldLoad: true,
    isError: false
  };
}

export function loadStart(state: any) {
  const prevState = state || {};
  return {
    ...prevState,
    isPending: true,
    shouldLoad: false,
    isError: false,
  };
}

export const loadComplete = (data: any) => {
  return {
    ...data,
    isPending: false,
    shouldLoad: false,
    isError: false,
  };
}
