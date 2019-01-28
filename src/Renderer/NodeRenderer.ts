import {ICollectionRenderer} from "./Renderer";
import {Node} from "../Graph/Node";
import {BaseType, Selection} from "d3-selection";
import CommonCollection from "../Graph/CommonCollection";
import * as d3 from "d3";

export class NodeRenderer implements ICollectionRenderer<Node> {
    private parent: Selection<SVGGElement, any, HTMLElement | null, undefined>;
    public container: Selection<SVGCircleElement, Node, BaseType, any>

    constructor(parent: Selection<SVGGElement, any, HTMLElement | null, undefined>) {
        this.parent = parent;
        this.container = this.parent
            .append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll(".node");
    }

    getColor = d3.scaleOrdinal(d3.schemeCategory10);

    render(nodes: CommonCollection<Node>) {
        const {getColor} = this;
        this.container = this.container
            .data(nodes.toArray(), function (d) {
                return d.entity.id;
            });

        this.container.exit().remove();
        this.container = this.container
            .enter()
            .append("circle")
            .attr("fill", function (d) {
                return getColor(d.entity.schema.name);
            })
            .attr('title', function (d) {
                return d.entity.getProperty('name').value
            })
            .attr("r", 8)
    }

    updatePositions() {
        this.container
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            })
    }
}