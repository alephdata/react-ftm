import {IEntity} from "./Entity";

export interface ILinkDatum {
    source:any,
    target:any,
    id:any,
    value:any
}

interface ILinkConfiguration {
    linkDatum:ILinkDatum
}
export default class Link implements IEntity<ILinkDatum>{
    source: any;
    target: any;
    private conf: ILinkDatum;
    constructor(configuration:ILinkConfiguration){
        this.source = configuration.linkDatum.source;
        this.target = configuration.linkDatum.target;
        this.value = configuration.linkDatum.value;
        this.conf = configuration.linkDatum;
    }
    toDatum(){
        return this.conf;
    }
    id: any;
    value: any;
}