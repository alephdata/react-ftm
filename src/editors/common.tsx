import {Entity, Property, Values} from "@alephdata/followthemoney";

export interface ITypeEditorProps {
  values: Values
  onChange: (values: Values) => void
  onSubmit: (values: Values) => void
  usePortal?: boolean
}
