import Graph from "./Graph/Graph";

const data = {
    "nodes": [
        {"id": "Davit", "group": 1},
        {"id": "Napoleon", "group": 20},
        {"id": "Napoledddon", "group": 20},

    ],
    "links": [
        {"source": "Napoleon", "target": "Davit", "value": 1},
        {"source": "Davit", "target": "Napoleon", "value": 1},
    ]
};
const links = data.links.map(d => Object.create(d));
const nodes = data.nodes.map(d => Object.create(d));

const alephGraph = new Graph({
    links,
    nodes,
    containerSelector:'#app',
    height:400,
    width:600
})

const addButton = document.createElement('button');
addButton.innerText = 'Add new node';
addButton.addEventListener('click', ()=>{
    debugger;
    alephGraph.addNode(Object.create({id:'chut'}))
});
const rootContainer = document.querySelector('#app');
if(rootContainer){
    rootContainer.appendChild(addButton);
}
