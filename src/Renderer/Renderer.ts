import * as d3 from 'd3';
import {Node} from "../Graph/Node";
import {Selection} from 'd3-selection';
import {BaseType} from "d3";
import {IGraphRenderer} from "../Graph/Layout";
import CommonCollection, {CommonCollectionStorage, ICommonCollectionEvent} from "../Graph/CommonCollection";
import {Link} from "../Graph/Link";

interface IGraphConfiguration {
    containerElement?: Element,
    containerSelector?: string,
    height: number,
    width: number,
}

export default class Renderer implements IGraphRenderer {
    private rootContainer: Selection<Element, any, HTMLElement | null, undefined>;
    private svgContainer: Selection<SVGSVGElement, any, HTMLElement | null, undefined>;
    private readonly width: number;
    private readonly height: number;
    private containerG: Selection<SVGGElement, any, HTMLElement | null, undefined>;
    private linkContainer: Selection<SVGLineElement, any, BaseType, any>;
    private nodeContainer: Selection<SVGCircleElement, any, BaseType, any>;

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

        // SETTINGS END ---

        this.svgContainer = this.rootContainer
            .append("div")
            .classed("svg-container", true)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", `0 0 ${this.width} ${this.height}`)
            .classed("svg-content-responsive", true);

        this.containerG = this.svgContainer
            .append("g")
            .attr("transform", "translate(" + configuration.width / 2 + "," + configuration.height / 2 + ")");
        this.linkContainer = this.containerG.append("g").attr("stroke", "#000").attr("stroke-width", 1.5).selectAll(".link");
        this.nodeContainer = this.containerG.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).selectAll(".node");
        this.restartLinks = this.restartLinks.bind(this);
        this.restartNodes = this.restartNodes.bind(this);
        this.render = this.render.bind(this);

    }

    restart(event:ICommonCollectionEvent<Node> | ICommonCollectionEvent<Link>):void {
        const {getColor} = this;
        // Apply the general update pattern to the nodes.
        if(<ICommonCollectionEvent<Node>>event){

                // .call(this.onDrag(this.simulation));
        }else if(<ICommonCollectionEvent<Link>>event){

        }

    }

    restartNodes(nodes: CommonCollection<Node>){
        const {getColor} = this;
        this.nodeContainer = this.nodeContainer
            .data(nodes.toArray(), function (d) {
                return d.id;
            });
        this.nodeContainer.exit().remove();
        this.nodeContainer = this.nodeContainer
            .enter()
            .append("circle")
            .attr("fill", function (d) {
                return getColor(d.entity.schema.name);
            })
            .attr("r", 8)

            .merge(this.nodeContainer)
    }
    restartLinks(links:CommonCollection<Link>){
        const {getColor} = this;

        // Apply the general update pattern to the links.
        this.linkContainer = this.linkContainer.data(links.toArray());
        this.linkContainer.exit().remove();
        this.linkContainer = this.linkContainer.enter().append("line")
            .attr("stroke", function (d) {
                return getColor(d.entity.schema.name);
            })
            .merge(this.linkContainer);
    }
    render() {
        this.nodeContainer
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            })

        this.linkContainer
            .attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });
    }

    // OOP Methods
    getColor = d3.scaleOrdinal(d3.schemeCategory10);

    onDrag(simulation: d3.Simulation<any, undefined>) {
        //TODO" must be refactored
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

}