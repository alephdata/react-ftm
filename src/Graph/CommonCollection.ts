import {Subject, merge, Observable, Observer, from} from "rxjs";
import { exhaust, filter, map} from "rxjs/operators";
import {IEntity} from "./Entity";

interface ICommonCollectionConfiguration<EntityType> {
    pureCollection?: Array<EntityType>
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

    constructor(configuration: ICommonCollectionConfiguration<EntityType>) {
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

    has(node: EntityType): Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            observer.next(this.storage.has(node));
            observer.complete();
        })
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
    // .pipe(map(
    //     (node: Node): Observable<Node> => this.has(node)
    //         .pipe(filter((shouldNotNodeBeAdded: boolean) => !shouldNotNodeBeAdded))
    //         .pipe(map(()=>node))
    // ))
    // .pipe(exhaust());

    readonly removeStream : Subject<EntityType> = Subject.create()
        .pipe(map((node: EntityType): Observable<boolean> => this.has(node)
            .pipe(filter((shouldNotNodeBeAdded: boolean) => shouldNotNodeBeAdded))
        ))
        .pipe(exhaust());

    readonly onAdded: Subject<ICommonCollectionEvent<EntityType>> = new Subject();

    readonly onRemoved: Subject<ICommonCollectionEvent<EntityType>> = new Subject();

    readonly onChange: Observable<ICommonCollectionEvent<EntityType>> = merge(
        this.onAdded,
        this.onRemoved,
    )
}