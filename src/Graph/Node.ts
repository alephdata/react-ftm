export interface INode {

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
    nodeDatum: INodeDatum
}

export class Node implements INode{
    private nodeDatum: INodeDatum;
    constructor(configuration:INodeConfiguration){
        this.nodeDatum = configuration.nodeDatum;
    }
    toObject(){
        return this.nodeDatum;
    }
}