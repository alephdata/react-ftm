import {Entity} from "../followthemoney/entity";
import Schema from "../followthemoney/schema";
import {PropertyValue} from "../followthemoney/PropertyValue";

export interface ILinkDatum {
    source: string,
    target: string,
    id: any,
}

interface ILinkConfiguration {
    linkDatum?: ILinkDatum,
    entity: Entity,
    schema: Schema
}

export class Link implements ILinkDatum {
    private edge: { source: PropertyValue; target: PropertyValue };
    public entity: Entity;
    public source: string;
    public target: string;

    static fromEntity(entity: Entity, rest?: ILinkConfiguration) {

        return new Link({
            schema: entity.schema,
            entity,
            ...rest
        })
    }

    // source: any;
    // target: any;
    // private conf: ILinkDatum;
    constructor(configuration: ILinkConfiguration)  {
        if (configuration.entity) {
            this.entity = configuration.entity;
            this.edge = this.entity.getEdge();
            this.source = this.edge.source.value;
            this.target = this.edge.target.value;
        } else {
            throw new Error('not a link');
        }

        // this.source = configuration.linkDatum.source;
        // this.target = configuration.linkDatum.target;
        // this.value = configuration.linkDatum.value;
        // this.conf = configuration.linkDatum;
    }

    id: any;
    value: any;
}