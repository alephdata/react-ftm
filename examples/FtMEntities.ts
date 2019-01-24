import {Layout} from "../src/Graph/Layout";
import {Node} from "../src/Graph/Node";
import {Link} from "../src/Graph/Link";
import {data} from "../resources/az_alievs";
import {Entity} from "../src/followthemoney/Entity";
import { schemata } from '../resources/_schemata';
import {Model} from "../src/followthemoney/model";
import Renderer from "../src/Renderer/Renderer";
import {map} from 'rxjs/operators';
export function start() {

    const alephGraph = new Layout({
        context: new Model(schemata)
    });

    const alephRenderer = new Renderer({
        height: 1080,
        width: 1179,
        container: document.querySelector('#app'),
    });

    alephGraph.onTick
        .subscribe(alephRenderer.render);
    alephGraph.nodes.onChange
        .pipe(map((event) => event.storage))
        .subscribe(alephRenderer.restartNodes);
    alephGraph.links.onChange
        .pipe(map((event) => event.storage))
        .subscribe(alephRenderer.restartLinks);

    data
        .map(entityDatum => alephGraph.emitEntity(entityDatum))
        .filter(entity => entity)
        .sort((entity1:Entity, entity2:Entity) => {
            return Number(entity1.is('Interval')) - Number(entity2.is('Interval'))
        })
        .forEach((entity:Entity) => {
            if((<Entity>entity).is('Thing')){
                console.log('entity was added', entity);
                alephGraph.addNode((<Entity>entity))
            }else if((<Entity>entity).is('Interval')){
                console.log('link was added', entity);
                alephGraph.addLink((<Entity>entity));
            }else{
                console.log('nothing was added', entity);
            }
        });

    const company: Entity = alephGraph.emit('Company');
    company.setProperty('name', ['occrp']);
    //
    const person: Entity = alephGraph.emit('Person');
    person.setProperty('name', ['Drew']);

    // TODO: describe this type of API
    // const person: Entity = alephGraph.emitThing('Person',{
    //     properties:[
    //         ['name','Drew']
    //     ]
    // });

    const connection: Entity = alephGraph.emit('Ownership')
        .setProperty('owner', [person.id])
        .setProperty('asset', [company.id]);
    ;
    //




    let node: Node;
    let link: Link;
    const rootContainer = document.querySelector('#app');

    const addButton = document.createElement('button');
    addButton.innerText = 'Add new node';
    addButton.addEventListener('click', () => {
        alephGraph.addNodes(company, person);
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
        alephGraph.addLink(connection);
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