import {Vertex} from "./Vertex";

export interface ILinkDatum {
    source: Vertex,
    target: Vertex,
    getIdentification():any;
}

interface ILinkConfiguration {
    source:Vertex,
    target:Vertex
}
/*
* @description Holds target and source `Nodes`
* */
export class Edge implements ILinkDatum {
    public source: Vertex;
    public target: Vertex;
    private index : number = 0;
    public payload: any;

    // source: any;
    // target: any;
    // private conf: ILinkDatum;
    constructor(configuration: ILinkConfiguration)  {
        this.source = configuration.source;
        this.target = configuration.target;

        // this.source = configuration.linkDatum.source;
        // this.target = configuration.linkDatum.target;
        // this.value = configuration.linkDatum.value;
        // this.conf = configuration.linkDatum;
    }

    getIdentification(){
        return this.index;
    }
    value: any;
}