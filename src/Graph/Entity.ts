import Schema from "../followthemoney/schema";
import Graph from "./Graph";
import {Model} from "../followthemoney/model";
import {PropertyValue} from "./PropertyValue";

interface IEntity<IDatum> {
    toDatum(): IDatum,
    setGraph(graph:Graph):void
}

interface IEntityDatum{
    schema: string;
    created_at: string;
    properties: { name: string[] };
    updated_at: string;
    bulk: boolean;
    schemata: string[];
    names: string[];
    id: string;
    name: string;
    links: { self: string; references: string; tags: string; ui: string };
    writeable: boolean;
}

export {IEntity}

export class Entity  {
    static generate(schemaName:string, model:Model):Entity{
        const schema = model.getSchema(schemaName);
        if(!schema){
            throw console.error(new Error('Schema is not found'))
        }
        return new Entity(schema)
    }
    public properties:Array<PropertyValue> = [];
    public schema: Schema;

    constructor(schema:Schema) {
        if(schema){
            this.schema = schema;
        }else{
            throw console.error(new Error('`schema` name is require'))
        }
    }
    setProperty(name:string, value: any): Entity{
        if(this.schema.hasProperty(name)){
            const propertyValue = new PropertyValue(name, value, this.schema.getProperty(name));
            this.properties.push(propertyValue);
            return this;
        }else{
            throw console.error(new Error('no such a property'));
        }
    }
}