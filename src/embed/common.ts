import { EntityManager } from 'components/common'
import { IEntityContext } from 'contexts/EntityContext'


export interface IWrappedElementProps {
  entityManager: EntityManager
  entityContext: IEntityContext
  writeable: boolean
  onUpdate: any
  layoutData?: any
}
