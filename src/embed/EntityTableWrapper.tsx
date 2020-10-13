import React from 'react'
import { IWrappedElementProps } from 'embed/common';
import { EntityTable } from 'components/EntityTable';


export default (props:IWrappedElementProps) => {
  const { entityManager, onUpdate, writeable } = props;
  return (
    <EntityTable
      entityManager={entityManager}
      writeable={writeable}
      updateFinishedCallback={() => onUpdate()}
      selection={[]}
    />
  )
}
