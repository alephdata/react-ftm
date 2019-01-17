import {Entity} from "./Entity";
import Schema from "../followthemoney/schema";

export interface ILinkDatum {
    source:any,
    target:any,
    id:any,
    value:any
}

interface ILinkConfiguration {
    linkDatum?:ILinkDatum,
    schema: Schema
}
export default class Link extends Entity{
    static fromEntity(entity:Entity, rest?:ILinkConfiguration){
        return new Link({schema:entity.schema, ...rest})
    }
    // source: any;
    // target: any;
    // private conf: ILinkDatum;
    constructor(configuration:ILinkConfiguration){
        super(configuration.schema);
        // this.source = configuration.linkDatum.source;
        // this.target = configuration.linkDatum.target;
        // this.value = configuration.linkDatum.value;
        // this.conf = configuration.linkDatum;
    }
    toDatum():ILinkDatum{
        return this;
    }
    id: any;
    value: any;
}