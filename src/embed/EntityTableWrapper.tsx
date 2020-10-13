import React from 'react'
import { IEmbeddedElementProps } from './EmbeddedElement';

import { EntityManager } from 'components/common'
import { EntityTable } from 'components/EntityTable';


export default class TableEditorWrapper extends React.Component <IEmbeddedElementProps> {
  private entityManager: EntityManager

  constructor(props: IEmbeddedElementProps) {
    super(props)

    if (props.data) {
      const entities = props.data?.entities || props.data?.layout?.entities;
      this.entityManager = EntityManager.fromJSON({}, entities);
    } else {
      this.entityManager = new EntityManager();
    }
  }

  render() {
    const { config } = this.props;
    const writeable = config?.writeable !== undefined ? config.writeable : true;

    return (
      <EntityTable
        entityManager={this.entityManager}
        writeable={writeable}
        selection={[]}
      />
    )
  }
}
