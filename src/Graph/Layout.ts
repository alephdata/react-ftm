import * as d3 from 'd3';
import {Node} from "./Node";
import {Simulation} from "d3";
import {Link} from "./Link";
import NodeCollection from "./NodeCollection";
import {LinkCollection} from "./LinkCollection";
import {merge, Observable, Subject} from "rxjs";
import {Model} from "../followthemoney/model";
import {Entity} from "../followthemoney/Entity";
import CommonCollection, {ICommonCollectionEvent} from "./CommonCollection";

export interface IGraphRenderer {
    restartNodes(nodes:NodeCollection):void
    restartLinks(links:LinkCollection):void
    render():void
}
interface IGraphConfiguration {
    links?: Entity[];
    nodes?: Entity[],
    context: Model
}


export class Layout {
    public readonly links: LinkCollection = new LinkCollection();
    public readonly onChange: Observable<ICommonCollectionEvent<Node> | ICommonCollectionEvent<Link>>;
    public readonly onTick = new Subject();
    public readonly simulation: Simulation<Node, undefined>;
    public readonly nodes: NodeCollection = new NodeCollection();
    private readonly context: Model;

    constructor(configuration: IGraphConfiguration) {

        if (configuration.context) {
            this.context = configuration.context;
        } else {
            throw console.error(new Error('Context is required'));
        }

        if (configuration.links) {
            this.addLinks(...configuration.links)
        }
        if (configuration.nodes) {
            this.addNodes(...configuration.nodes)
        }


        this.simulation = d3.forceSimulation(this.nodes.toArray())
            .force("charge", d3.forceManyBody().strength(-200))
            // .force('center', d3.forceCenter())
            .force('collide', d3.forceCollide(8 * 1.5).strength(1))
            .force("link", d3.forceLink<Node, Link>(this.links.toArray()).id((d) => d.entity.id))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .alphaTarget(1)
            .on("tick", () => this.onTick.next('kk'));

        this.onChange = merge(this.nodes.onChange, this.links.onChange);
        this.onChange
            .subscribe(this.restart.bind(this))
    }

    private restart() {
        this.simulation.nodes(this.nodes.toArray());
        this.simulation
            .force("link", d3.forceLink<Node, Link>(this.links.toArray())
                .distance(100).id(d => d.entity.id))
        this.simulation.alpha(1).restart();
    }
    addNode(entity: Entity): Node {
        const node = Node.fromEntity(entity);
        this.nodes.add(node);
        return node;
    }

    addNodes(...nodes: Array<Entity>): Layout{
        nodes.forEach(node => this.addNode(node));
        return this;
    }

    removeNode(node: Node) {
        this.nodes.remove(node);
    }

    addLinks(...links: Array<Entity>): Layout {
        links.forEach(link=> this.addLink(link));
        return this;
    }

    addLink(entity: Entity): Link {
        const link = Link.fromEntity(entity);
        this.links.add(link);
        return link;
    }

    removeLink(link: Link) {
        this.links.remove(link);
    }

    emit(schemaName: string, entity?: any) {
        return this.emitEntity({
            schema: schemaName,
            ...entity
        })
    }

    emitEntity(entity: any): Entity {
        if (entity.schema) {
            return Entity.generate(entity.schema, this.context, entity)
        }
        throw new Error('no schem description found')
    }
}