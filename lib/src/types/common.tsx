import {Entity, Property, Values} from "@alephdata/followthemoney";

export interface ITypeProps {
  values: Values
  property: Property
  entity: Entity
  onPropertyChanged: (values: Values, property: Property) => void
}

export interface ITypeState {
  isEditable: boolean
}
