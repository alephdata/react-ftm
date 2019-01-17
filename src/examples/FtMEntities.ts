import Graph from "../Graph/Graph";
import {Node} from "../Graph/Node";
import Link from "../Graph/Link";
import {entity} from "../testData/entity";
import {Entity} from "../Graph/Entity";
import { schemata } from './_schemata';
import {Model} from "../followthemoney/model";

export function start() {

    const alephGraph = new Graph({
        nodes:[],
        width:100,
        height:100,
        containerSelector:'#myGraph',
        links:[],
        context: new Model(schemata)
    });

    const company: Entity = alephGraph.emitThing('Company');
    company.setProperty('name', 'occrp');

    const person: Entity = alephGraph.emitThing('Person');
    person.setProperty('name', 'Drew');

    // TODO: describe this type of API
    // const person: Entity = alephGraph.emitThing('Person',{
    //     properties:[
    //         ['name','Drew']
    //     ]
    // });
    const connection: Entity = alephGraph.emitEdge('Ownership')
        .setProperty('owner', person)
        .setProperty('asset',company);
    ;

    alephGraph.addNodes(company, person);
    alephGraph.addLink(connection);



    let node: Node;
    let link: Link;
    const rootContainer = document.querySelector('#app');

    const addButton = document.createElement('button');
    addButton.innerText = 'Add new node';
    addButton.addEventListener('click', () => {
        debugger;
        node = alephGraph.addNode(Object.create({id: 'chut'}));
    });
    if (rootContainer) {
        rootContainer.appendChild(addButton);
    }
    const removeBuddon = document.createElement('button');
    removeBuddon.innerText = 'remove the node';
    removeBuddon.addEventListener('click', () => {
        alephGraph.removeNode(node);
    });
    if (rootContainer) {
        rootContainer.appendChild(removeBuddon);
    }

    const addLink = document.createElement('button');
    addLink.innerText = 'Add new link';
    addLink.addEventListener('click', () => {
        link = alephGraph.addLink(Object.create({"source": "Davit", "target": "chut", "value": 2}));
    });
    if (rootContainer) {
        rootContainer.appendChild(addLink);
    }
    const removeLink = document.createElement('button');
    removeLink.innerText = 'Remove link';
    removeLink.addEventListener('click', () => {
        alephGraph.removeLink(link);
    });
    if (rootContainer) {
        rootContainer.appendChild(removeLink);
    }
}