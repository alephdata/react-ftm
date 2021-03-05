import { IEntityContext } from 'contexts/IEntityContext'


export interface IWrappedElementProps {
  entityContext: IEntityContext
  writeable: boolean
  onUpdate: any
  layoutData?: any
}
