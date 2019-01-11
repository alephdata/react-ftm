import * as d3 from 'd3';
import {Node, INode, INodeDatum} from "./Node";
import {Selection} from 'd3-selection';
import {BaseType, Simulation} from "d3";
import Link, {ILinkDatum} from "./Link";
import NodeCollection from "./NodeCollection";

interface IGraphConfiguration {
    links: ILinkDatum[];
    containerElement ?: Element,
    containerSelector ?: string,
    height: number,
    width: number,
    nodes: INodeDatum[]
}

export default class Graph {
    private rootContainer: Selection<Element, any, HTMLElement | null, undefined>;
    private svgContainer: Selection<SVGSVGElement, any, HTMLElement | null, undefined>;
    private readonly width: number;
    private readonly height: number;
    private readonly simulation: Simulation<INodeDatum | {}, undefined>;
    private links: Link[] = [];
    private nodes: NodeCollection;
    private nodeContainer: Selection<SVGGElement, any, HTMLElement | null, undefined>;

    // private container: Selection<BaseType, any, HTMLElement, any>;
    constructor(configuration: IGraphConfiguration) {

        if (configuration.containerElement) {
            this.rootContainer = d3.select(configuration.containerElement);
        } else if (configuration.containerSelector) {
            this.rootContainer = d3.select(configuration.containerSelector)
        } else {
            throw console.error(new Error('`configuration.containerElement` or `configuration.containerSelector` must be set'))
        }

        if (configuration.width) {
            this.width = configuration.width;
        } else {
            throw console.error(new Error('`configuration.width` must be set'))
        }

        if (configuration.height) {
            this.height = configuration.height;
        } else {
            throw console.error(new Error('`configuration.height` must be set'))
        }

        if(configuration.links){
            this.links = configuration.links.map(linkDatum => new Link({
                linkDatum
            }));
        }
        if(configuration.nodes){
            this.nodes = new NodeCollection({
                nodeList : configuration.nodes.map((nodeDatum) => new Node({
                    nodeDatum
                }))
            })
        }else{
            this.nodes = new NodeCollection({})
        }
        this.nodes.onNodeAdded
            .subscribe(()=>{
                this.simulation
                    .nodes(this.nodes.toArray());
            })
        this.svgContainer = this.rootContainer
            .append("div")
            .classed("svg-container", true)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", `0 0 ${this.width} ${this.height}`)
            .classed("svg-content-responsive", true);


        this.simulation = d3.forceSimulation()
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(this.width / 2, this.height / 2));
        this.simulation
            .nodes(configuration.nodes)
            .force("link", d3.forceLink<INodeDatum, ILinkDatum>(configuration.links).id((d) => d.id))


        const link = this.svgContainer.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(configuration.links)
            .enter().append("line")
            .attr("stroke-width", d => Math.sqrt(d.value));

        this.nodeContainer = this.svgContainer.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)

        const node = this.nodeContainer
            .selectAll("circle")
            .data(this.nodes.toArray())
            .enter().append("circle")
            .attr("r", 5)
            .attr("fill", this.getColor)
            .call(this.onDrag(this.simulation));
        node.append("title")
            .text(d => d.id);
        this.simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
            // @ts-ignore
                .attr("cx", (d) => d.x)
                .attr("cy", (d: { y: string | number | boolean | null; }) => d.y);
        });
        this.nodes.onNodeAdded
            .subscribe(()=> {
                console.log('ON change')
                this.simulation.nodes(this.nodes.toArray())

                const node = this.nodeContainer
                    .selectAll("circle")
                    .data(this.nodes.toArray())
                    .enter().append("circle")
                    .attr("r", 5)
                    .attr("fill", this.getColor)
                    .call(this.onDrag(this.simulation));
                node.append("title")
                    .text(d => d.id);
                this.simulation.alpha(0.2).restart();

            })
    }




    // OOP Methods
    getColor = (d:any) => d3.scaleOrdinal(d3.schemeCategory10)(d)
    onDrag(simulation: d3.Simulation<any, undefined>) {

        function dragstarted(d: { fx: any; x: any; fy: any; y: any; }) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d: { fx: any; fy: any; }) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d: { fx: null; fy: null; }) {
            if (!d3.event.active) simulation.alphaTarget(0);
            // d.fx = null;
            // d.fy = null;
        }

        return d3.drag()
        // @ts-ignore
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }
    addNode(nodeDatum: INodeDatum) {
        this.nodes.addNode(new Node({nodeDatum}))
    }

    addLink(linkDatum: ILinkDatum): Link {
        return new Link({linkDatum})
    }
}