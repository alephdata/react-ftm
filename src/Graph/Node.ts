import {Entity, IEntity} from "./Entity";
import Schema from "../followthemoney/schema";

export interface INode<IDatum> extends IEntity<IDatum>{

}
export interface INodeDatum {
    id:any,
    /**
     * Node’s zero-based index into nodes array. This property is set during the initialization process of a simulation.
     */
    index?: number;
    /**
     * Node’s current x-position
     */
    x?: number;
    /**
     * Node’s current y-position
     */
    y?: number;
    /**
     * Node’s current x-velocity
     */
    vx?: number;
    /**
     * Node’s current y-velocity
     */
    vy?: number;
    /**
     * Node’s fixed x-position (if position was fixed)
     */
    fx?: number | null;
    /**
     * Node’s fixed y-position (if position was fixed)
     */
    fy?: number | null;
}
interface INodeConfiguration {
    schema:Schema
}

export class Node extends Entity{
    static fromEntity(entity:Entity){
        return new Node({schema:entity.schema})
    }
    constructor(configuration:INodeConfiguration){
        super(configuration.schema);
    }
    toDatum():INodeDatum{
        return this;
    }
}