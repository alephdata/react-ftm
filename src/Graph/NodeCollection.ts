import {Subject, merge, Observable, Observer, from} from "rxjs";
import {endWith, exhaust, filter, map, tap} from "rxjs/operators";
import {INodeDatum, Node} from "./Node";

interface INodeCollectionConfiguration {
    nodeList?: Array<Node>
}

const enum NodeCollectionEventTypes {
    ADDED,
    REMOVED,
}

interface INodeCollectionEvent {
    type: NodeCollectionEventTypes,
    node: Node
}

export default class NodeCollection {
    private nodeStorage: Set<Node> = new Set<Node>();

    constructor(configuration: INodeCollectionConfiguration) {
        this.add
            .pipe(map((node:Node):INodeCollectionEvent => ({node, type:NodeCollectionEventTypes.ADDED})))
            .subscribe(this.onNodeAdded);
        this.add.subscribe((...argss)=>console.log('qaq'),()=>console.log('1'),()=>console.log('2'))
        this.remove
            .pipe(map((node:Node):INodeCollectionEvent => ({node, type:NodeCollectionEventTypes.REMOVED})))
            .subscribe(this.onNodeRemoved);

        this.onNodeAdded
            .subscribe((event) => this.nodeStorage.add(event.node));
        this.onNodeRemoved
            .subscribe((event) => this.nodeStorage.delete(event.node));



        if (configuration.nodeList) {
            configuration.nodeList.forEach(node => this.addNode(node))
        }

    }

    hasNode(node: Node): Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            observer.next(this.nodeStorage.has(node));
            observer.complete();
        })
    }

    addNode(node: Node) {
        return this.add.next(node)
    }

    removeNode(node: Node) {
        return this.remove.next(node)
    }

    toArray(): Array<INodeDatum> {
        return Array.from(this.nodeStorage.values()).map(n => n.toObject());
    }
    readonly add : Subject<Node> = Reflect.construct(Subject, [])
        // .pipe(map(
        //     (node: Node): Observable<Node> => this.hasNode(node)
        //         .pipe(filter((shouldNotNodeBeAdded: boolean) => !shouldNotNodeBeAdded))
        //         .pipe(map(()=>node))
        // ))
        // .pipe(exhaust());

    readonly remove : Subject<Node> = Subject.create()
        .pipe(map((node: Node): Observable<boolean> => this.hasNode(node)
            .pipe(filter((shouldNotNodeBeAdded: boolean) => shouldNotNodeBeAdded))
        ))
        .pipe(exhaust());

    readonly onNodeAdded: Subject<INodeCollectionEvent> = Reflect.construct(Subject, [])

    readonly onNodeRemoved: Subject<INodeCollectionEvent> = Subject.create()

    readonly onChange: Observable<INodeCollectionEvent | Node> = merge(
        this.onNodeAdded,
        this.onNodeRemoved,
    )
}