import { Entity } from '@alephdata/followthemoney';

export const fetchLocalData = (id: string) => {
  const storedData = localStorage.getItem(id);
  return storedData && JSON.parse(storedData);
}

export const setLocalData = (id: string, entities: Array<Entity>, additionalData: any) => {
  console.log('setting localstorage', entities);
  const updatedData = JSON.stringify({
    entities,
    ...additionalData
  })
  localStorage.setItem(id, updatedData);
}
