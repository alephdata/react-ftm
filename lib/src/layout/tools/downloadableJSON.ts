import {GraphLayout} from "../GraphLayout";

export function downloadableJSON(layout:GraphLayout):string {
  return URL.createObjectURL(new Blob([JSON.stringify(layout.toJSON())], {
    type:'application/json'
  }))
}
