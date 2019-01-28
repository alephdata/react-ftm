import {Entity} from "../followthemoney/entity";
import Schema from "../followthemoney/schema";

export interface INodeDatum {
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
    schema:Schema,
    coordinates?:INodeDatum,
    entity:Entity
}

export class Node implements INodeDatum{
    public x:number = 0;
    public y:number = 0;
    public entity: any;
    static fromEntity(entity:Entity){
        return new Node({schema:entity.schema, entity})
    }
    constructor(configuration:INodeConfiguration){
        this.entity = configuration.entity;
    }

}