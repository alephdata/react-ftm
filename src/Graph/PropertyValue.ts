import Property from "../followthemoney/property";

export class PropertyValue{
    private name: string;
    private value: any;
    private property: Property;
    constructor(name:string, value:any, property:Property){
        this.name = name;
        this.value = value;
        this.property = property;
    }
}