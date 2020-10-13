import { EntityManager } from 'components/common'

export interface IWrappedElementProps {
  entityManager: EntityManager
  writeable: boolean
  onUpdate: any
  layoutData?: any
}
