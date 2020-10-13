import { Entity } from "@alephdata/followthemoney";
import { WrappedComponentProps } from 'react-intl';

import { EntityManager } from 'components/common'
import { EntityChanges } from 'components/common/types'


export interface IEntityTableCommonProps extends WrappedComponentProps {
  entityManager: EntityManager
  visitEntity?: (entity: Entity | string) => void
  updateFinishedCallback?: (entityChanges: EntityChanges) => void
  writeable: boolean
  isPending?: boolean
}
