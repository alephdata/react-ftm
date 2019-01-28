import {Subject, merge, Observable, Observer, from} from "rxjs";
import {filter, map} from "rxjs/operators";
import {IEntity} from "../followthemoney/entity";


const enum CommonCollectionEventTypes {
    ADDED,
    REMOVED,
}

export type CommonCollectionStorage<EntityType> = Set<EntityType>;

export interface ICommonCollectionEvent<EntityType> {
    type: CommonCollectionEventTypes,
    entity: EntityType,
    storage: CommonCollection<EntityType>
}


export default class CommonCollection<EntityType extends IEntity> {

    private storage: CommonCollectionStorage<EntityType> = new Set<EntityType>();

    constructor(pureCollection?: Array<EntityType>,) {
        this.addStream
            .pipe(map((entity: EntityType): ICommonCollectionEvent<EntityType> => ({
                entity,
                storage: this,
                type: CommonCollectionEventTypes.ADDED
            })))
            .subscribe(this.onAdded);
        this.removeStream
            .pipe(map((entity: EntityType): ICommonCollectionEvent<EntityType> => ({
                entity,
                storage: this,
                type: CommonCollectionEventTypes.REMOVED
            })))
            .subscribe(this.onRemoved);

        this.onAdded
            .subscribe((event) => this.storage.add(event.entity));
        this.onRemoved
            .subscribe((event) => this.storage.delete(event.entity));


        if (pureCollection) {
            pureCollection.forEach(entity => this.add(entity))
        }

    }

    has(node: EntityType): boolean {
        return this.storage.has(node);
    }

    add(entity: EntityType) {
        return this.addStream.next(entity)
    }

    remove(entity: EntityType) {
        return this.removeStream.next(entity)
    }

    toArray(): Array<EntityType> {
        return Array.from(this.storage.values());
    }

    readonly addStream: Subject<EntityType> = Reflect.construct(Subject, [])
        .pipe(filter((entity: EntityType) => !this.has(entity)))


    readonly removeStream: Subject<EntityType> = Reflect.construct(Subject, [])
        .pipe(filter((entity: EntityType) => this.has(entity)));

    readonly onAdded: Subject<ICommonCollectionEvent<EntityType>> = new Subject();

    readonly onRemoved: Subject<ICommonCollectionEvent<EntityType>> = new Subject();

    readonly onChange: Observable<ICommonCollectionEvent<EntityType>> = merge(
        this.onAdded,
        this.onRemoved,
    )
}