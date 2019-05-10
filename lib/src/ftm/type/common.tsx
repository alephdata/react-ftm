import {Entity, Property, Values} from "@alephdata/followthemoney";

export interface ITypeProps {
  values: Values
  property: Property
  entity: Entity
  onPropertyChanged: (values: Values, property: Property) => void
}

export function predicate(term:string, query:string){
  return term.trim().toLowerCase().indexOf(query.trim().toLowerCase()) !== -1
}
