import {TypeCommon} from "./types/TypeCommon";

export interface IPropertyDatum {
    name:string,
    qname:string,
    label: string,
    description: string | null,
    caption: boolean,
    stub: boolean,
    uri: string,
    type: string,
    schema?: string,
    reverse ?:  string
}

export default class Property {
    public readonly name: string;
    private schema: any;
    private behaviour: any;

    constructor(name: string, value: any, behaviour: any) {
        this.name = name;

    }

    get caption() {
        return this.behaviour.caption
    }

    get label(): string {
        return this.behaviour.label || this.name;
    }

    get type(): string {
        return this.behaviour.type;
    }

    extends(parentSchema) {
        return this.behaviour.schema === parentSchema;
    }
}