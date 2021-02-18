import { Entity } from "@alephdata/followthemoney";
import { WrappedComponentProps } from 'react-intl';

import { EntityManager } from 'components/common'
import { EntityChanges } from 'components/common/types'
import { IEntityContext } from 'contexts/EntityContext';


export interface IEntityTableCommonProps extends WrappedComponentProps {
  entityManager: EntityManager
  entityContext: IEntityContext
  visitEntity?: (entity: Entity | string) => void
  updateFinishedCallback?: (entityChanges: EntityChanges) => void
  writeable: boolean
  isPending?: boolean
}
