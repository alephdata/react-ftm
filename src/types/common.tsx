import {Entity, Property, Values} from "@alephdata/followthemoney";

export interface ITypeProps {
  values: Values
  property: Property
  entity: Entity
  onChange: (values: Values) => void
  onSubmit: (values: Values) => void
}
