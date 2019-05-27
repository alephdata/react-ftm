import {GraphLayout} from "../GraphLayout";

export function exportJSON(layout:GraphLayout):string {
  return URL.createObjectURL(new Blob([JSON.stringify(layout.toJSON())], {
    type:'application/json'
  }))
}
