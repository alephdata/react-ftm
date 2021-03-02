import { IEntityContext } from 'contexts/EntityContext'


export interface IWrappedElementProps {
  entityContext: IEntityContext
  writeable: boolean
  onUpdate: any
  layoutData?: any
}
