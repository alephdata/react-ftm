import {Entity} from "../followthemoney/entity";

export interface INodeDatum {
    /**
     * Vertex’s zero-based index into nodes array. This property is set during the initialization process of a simulation.
     */
    index?: number;
    /**
     * Vertex’s current x-position
     */
    x?: number;
    /**
     * Vertex’s current y-position
     */
    y?: number;
    /**
     * Vertex’s current x-velocity
     */
    vx?: number;
    /**
     * Vertex’s current y-velocity
     */
    vy?: number;
    /**
     * Vertex’s fixed x-position (if position was fixed)
     */
    fx?: number | null;
    /**
     * Vertex’s fixed y-position (if position was fixed)
     */
    fy?: number | null;

    getIdentification():any
}

/*
* Responsible for holding Vertex coordinates
* */
export class Vertex implements INodeDatum{
    public x:number = 0;
    public y:number = 0;
    public index: number = 0;
    static ofType<T>(payload:T){
        return new Vertex()
    }

    getIdentification(){
        return <any>this.index;
    }

}