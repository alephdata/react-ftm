import {Entity, Property, Values} from "@alephdata/followthemoney";

export interface ITypeProps {
  values: Values
  property: Property
  entity: Entity
  onChange: (values: Values, property: Property) => void
  onSubmit: (values: Values) => void
}
