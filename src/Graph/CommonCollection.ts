import {Subject, merge, Observable, Observer, from} from "rxjs";
import {exhaust, filter, map, sample} from "rxjs/operators";
import {IEntity} from "./Entity";
import Graph from "./Graph";

interface ICommonCollectionConfiguration<EntityType> {
    pureCollection?: Array<EntityType>,
    graph: Graph
}

const enum CommonCollectionEventTypes {
    ADDED,
    REMOVED,
}

interface ICommonCollectionEvent <EntityType> {
    type: CommonCollectionEventTypes,
    entity: EntityType
}

export default class CommonCollection<IDatum, EntityType extends IEntity<IDatum>> {

    private storage: Set<EntityType> = new Set<EntityType>();
    private graph: Graph;

    constructor(configuration: ICommonCollectionConfiguration<EntityType>) {
        if(configuration.graph){
            this.graph = configuration.graph;
        }else{
            throw console.error(new Error('property `graph` is required.'))
        }
        this.addStream
            .pipe(map((entity:EntityType):ICommonCollectionEvent<EntityType> => ({entity, type:CommonCollectionEventTypes.ADDED})))
            .subscribe(this.onAdded);
        this.removeStream
            .pipe(map((entity:EntityType):ICommonCollectionEvent<EntityType> => ({entity, type:CommonCollectionEventTypes.REMOVED})))
            .subscribe(this.onRemoved);

        this.onAdded
            .subscribe((event) => this.storage.add(event.entity));
        this.onRemoved
            .subscribe((event) => this.storage.delete(event.entity));



        if (configuration.pureCollection) {
            configuration.pureCollection.forEach(entity => this.add(entity))
        }

    }

    has(node: EntityType): boolean{
        return this.storage.has(node);
    }

    add(entity: EntityType) {
        return this.addStream.next(entity)
    }

    remove(entity: EntityType) {
        return this.removeStream.next(entity)
    }

    toArray(): Array<IDatum> {
        return Array.from(this.storage.values()).map(n => n.toDatum());
    }
    readonly addStream : Subject<EntityType> = Reflect.construct(Subject, [])
        .pipe(filter((entity:EntityType) => !this.has(entity)))
        .pipe(map((entity:EntityType) => {
            entity.setGraph(this.graph);
            return entity
        }));


    readonly removeStream : Subject<EntityType> = Reflect.construct(Subject,[])
        .pipe(filter((entity:EntityType) => this.has(entity)));

    readonly onAdded: Subject<ICommonCollectionEvent<EntityType>> = new Subject();

    readonly onRemoved: Subject<ICommonCollectionEvent<EntityType>> = new Subject();

    readonly onChange: Observable<ICommonCollectionEvent<EntityType>> = merge(
        this.onAdded,
        this.onRemoved,
    )
}