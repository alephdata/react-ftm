// import Graph from "../src/core/Graph";
// import {Vertex} from "../src/core/Vertex";
// import {Edge} from "../src/core/Edge";
//
// export function start() {
//
//
//     const data = {
//         "nodes": [
//             {"id": "Davit", "group": 1},
//             {"id": "Napoleon", "group": 20},
//             {"id": "Napoledddon", "group": 20},
//
//         ],
//         "links": [
//             {"source": "Napoleon", "target": "Davit", "value": 1},
//             {"source": "Davit", "target": "Napoledddon", "value": 2},
//         ]
//     };
//
//     const links = data.links.map(d => Object.create(d));
//     const nodes = data.nodes.map(d => Object.create(d));
//
//     // @ts-ignore
//     const alephGraph = new Graph({
//         links,
//         nodes,
//         containerSelector: '#app',
//         height: 400,
//         width: 600
//     })
//
//     let node: Vertex;
//     let link: Edge;
//     const rootContainer = document.querySelector('#app');
//
//     const addButton = document.createElement('button');
//     addButton.innerText = 'Add new node';
//     addButton.addEventListener('click', () => {
//         node = alephGraph.addNode(Object.create({id: 'chut'}));
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
//         link = alephGraph.addLink(Object.create({"source": "Davit", "target": "chut", "value": 2}));
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
