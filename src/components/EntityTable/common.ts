import { Entity } from "@alephdata/followthemoney";
import { WrappedComponentProps } from 'react-intl';

import { EntityChanges } from 'components/common/types'
import { IEntityContext } from 'contexts';


export interface IEntityTableCommonProps extends WrappedComponentProps {
  entityContext: IEntityContext
  visitEntity?: (entity: Entity | string) => void
  updateFinishedCallback?: (entityChanges: EntityChanges) => void
  writeable: boolean
  isPending?: boolean
}
