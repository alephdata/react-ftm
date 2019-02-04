// import {Layout} from "../src/core/Layout";
// import {Vertex} from "../src/core/Vertex";
// import {Edge} from "../src/core/Edge";
// import {data} from "../resources/az_alievs";
// import {Entity} from "../src/followthemoney/entity";
//
// import {ZeroConfig} from "../src/ZeroConfig";
// export function start() {
//
//     const {layout:alephGraph} = new ZeroConfig({
//         container:<Element>document.querySelector('#app'),
//     })
//     data
//         .map(entityDatum => alephGraph.emitEntity(entityDatum))
//         .filter(entity => entity)
//         .sort((entity1:Entity, entity2:Entity) => {
//             return Number(entity1.is('Interval')) - Number(entity2.is('Interval'))
//         })
//         .forEach((entity:Entity) => {
//             if((entity).is('Thing')){
//                 alephGraph.addNode((entity))
//             }else if((entity).is('Interval')){
//                 alephGraph.addLink((entity));
//             }else{
//                 console.log('nothing was added', entity);
//             }
//         });
//
//     const company: Entity = alephGraph.emit('Company');
//     company.setProperty('name', ['occrp']);
//     //
//     const person: Entity = alephGraph.emit('Person');
//     person.setProperty('name', ['Drew']);
//
//     // TODO: describe this type of API
//     // const person: Entity = alephGraph.emitThing('Person',{
//     //     properties:[
//     //         ['name','Drew']
//     //     ]
//     // });
//
//     const connection: Entity = alephGraph.emit('Ownership')
//         .setProperty('owner', [person.id])
//         .setProperty('asset', [company.id]);
//     ;
//     //
//
//
//
//
//     let node: Vertex;
//     let link: Edge;
//     const rootContainer = document.querySelector('#app');
//
//     const addButton = document.createElement('button');
//     addButton.innerText = 'Add new node';
//     addButton.addEventListener('click', () => {
//         alephGraph.addNode(person);
//     });
//     if (rootContainer) {
//         rootContainer.appendChild(addButton);
//     }
//     const removeBuddon = document.createElement('button');
//     removeBuddon.innerText = 'remove the node';
//     removeBuddon.addEventListener('click', () => {
//         alephGraph.removeNode(node);
//     });
//     if (rootContainer) {
//         rootContainer.appendChild(removeBuddon);
//     }
//
//     const addLink = document.createElement('button');
//     addLink.innerText = 'Add new link';
//     addLink.addEventListener('click', () => {
//         alephGraph.addLink(connection);
//     });
//     if (rootContainer) {
//         rootContainer.appendChild(addLink);
//     }
//     const removeLink = document.createElement('button');
//     removeLink.innerText = 'Remove link';
//     removeLink.addEventListener('click', () => {
//         alephGraph.removeLink(link);
//     });
//     if (rootContainer) {
//         rootContainer.appendChild(removeLink);
//     }
// }
