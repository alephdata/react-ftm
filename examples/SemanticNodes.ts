// import { Layout } from '../src/core'
// import { schemata } from '../resources/_schemata'
// import { Model } from '../src/followthemoney/model'
// import renderer from '../src/renderer/renderer'
// import { Entity } from '../src/followthemoney/entity'
// import { Vertex } from '../src/core/Vertex'
// import { PropertyValue } from '../src/followthemoney/PropertyValue'
// import { Edge } from '../src/core/Edge'
// import { ZeroConfig } from '../src/ZeroConfig'
//
// export function start() {
//
//   const graph = new ZeroConfig({
//     container: document.getElementById('#app') as Element,
//     height: 1080,
//     width: 1179,
//     schemata
//   })
//
//   const Person = graph.model.emit('Person')
//
//   const a = new EntityNode(Person)
//   graph.layout.addNode(a)
//
//   const b = new PropertyNode(Person.getProperty('company'))
//   graph.layout.addNode(b)
//
//   const company = graph.model.emit('Company')
//
//   graph.layout.addNode(
//     new EntityNode(
//       company
//     )
//   )
//
//   graph.layout.addLink(
//     new Edge({
//       source: a,
//       target: b
//     })
//   )
//
//   const me = context.emit('Person')
//   me.setProperty('name', ['Davit'])
//
//   // const toRender = new EntityNode(me, function render(entity):string{
//   //     return `<div>
//   //         {entity.getPropery(name)}
//   //     </div>`
//   // });
//   // const toRender2  = new EntityNode(me, EntityNode.defautlRenerer);
//
//   // layout.addNode(new EntityNode2(me))
// }
//
// class PropertyNode extends Vertex {
//   private readonly property: PropertyValue
//
//   constructor(property: PropertyValue) {
//     super()
//     this.property = property
//   }
//
//   getIdentification() {
//     return this.property
//   }
//
//   render() {
//     return 'asdasd'
//   }
// }
//
// class EntityNode extends Vertex {
//   private readonly entity: Entity
//
//   constructor(entity: Entity) {
//     super()
//     this.entity = entity
//   }
//
//   getIdentification(): string {
//     return this.entity.id
//   }
//
// }
