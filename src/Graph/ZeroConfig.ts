import {Layout} from "./Layout";
import {Model} from "../followthemoney/model";
import {schemata} from "../../resources/_schemata";
import Renderer from "../Renderer/Renderer";
import {map} from "rxjs/operators";
import {Draggable} from "../extensions";


interface IZeroConfig {
    height?:number,
    width?:number,
    container:Element
}
export class ZeroConfig {
    public layout: Layout;
    public renderer: Renderer;
    private draggable: Draggable;

    constructor({
        height = 1080,
        width = 1179,
        container
    }:IZeroConfig) {
        this.layout = new Layout({
            context: new Model(schemata)
        });
        this.renderer = new Renderer({
            height,
            width,
            container,
        });
        this.layout.onTick
            .subscribe(this.renderer.render);
        this.layout.nodes.onChange
            .pipe(map((event) => event.storage))
            .subscribe(this.renderer.restartNodes);
        this.layout.links.onChange
            .pipe(map((event) => event.storage))
            .subscribe(this.renderer.restartLinks);

        this.draggable = new Draggable(this.layout, this.renderer)
    }
}