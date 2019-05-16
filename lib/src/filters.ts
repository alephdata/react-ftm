import { Vertex } from "./layout/Vertex";


export function filterVerticesByText(text: string) {
  const terms = text.split(' ')
    .map((t) => t.trim().toLocaleLowerCase())
    .filter((t) => t.length)
  return (vertex: Vertex) => {
    const text = vertex.label.toLocaleLowerCase()
    // TODO: should this filter all values for entity vertices
    const matching = terms.filter((term) => {
      return text.indexOf(term) !== -1
    });
    return terms.length !== 0 && matching.length === terms.length
  }
}


export function matchText(term:string, query:string){
  return term.trim().toLowerCase().indexOf(query.trim().toLowerCase()) !== -1
}
