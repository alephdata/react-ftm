import { Subject, merge, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'

const enum CommonCollectionEventTypes {
  ADDED,
  REMOVED
}

export type CommonCollectionStorage<EntityType> = Set<EntityType>

export interface ICommonCollectionEvent<EntityType> {
  type: CommonCollectionEventTypes
  entity: EntityType
  collection: CommonCollection<EntityType>
}

export class CommonCollection<EntityType> {
  private storage: CommonCollectionStorage<EntityType> = new Set<EntityType>()

  constructor(pureCollection?: Array<EntityType>) {
    this.addStream
      .pipe(
        map(
          (entity: EntityType): ICommonCollectionEvent<EntityType> => ({
            entity,
            collection: this,
            type: CommonCollectionEventTypes.ADDED
          })
        )
      )
      .subscribe(this.onAdded)
    this.removeStream
      .pipe(
        map(
          (entity: EntityType): ICommonCollectionEvent<EntityType> => ({
            entity,
            collection: this,
            type: CommonCollectionEventTypes.REMOVED
          })
        )
      )
      .subscribe(this.onRemoved)

    this.onAdded.subscribe(event => event.collection.storage.add(event.entity))
    this.onRemoved.subscribe(event => event.collection.storage.delete(event.entity))

    if (pureCollection) {
      pureCollection.forEach(entity => this.add(entity))
    }
  }

  has(node: EntityType): boolean {
    return this.storage.has(node)
  }

  add(entity: EntityType) {
    return this.addStream.next(entity)
  }

  remove(entity: EntityType) {
    return this.removeStream.next(entity)
  }

  toArray(): Array<EntityType> {
    return Array.from(this.storage.values())
  }

  readonly addStream: Subject<EntityType> = Reflect.construct(Subject, []).pipe(
    filter((entity: EntityType) => !this.has(entity))
  )

  readonly removeStream: Subject<EntityType> = Reflect.construct(Subject, []).pipe(
    filter((entity: EntityType) => this.has(entity))
  )

  readonly onAdded: Subject<ICommonCollectionEvent<EntityType>> = new Subject()

  readonly onRemoved: Subject<ICommonCollectionEvent<EntityType>> = new Subject()

  readonly onChange: Observable<ICommonCollectionEvent<EntityType>> = merge(
    this.onAdded,
    this.onRemoved
  )
}
