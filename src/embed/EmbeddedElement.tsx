import React from 'react'

import NetworkDiagramWrapper from 'embed/NetworkDiagramWrapper';
import EntityTableWrapper from 'embed/EntityTableWrapper';
import { EntityManager } from 'components/common'

export interface IEmbeddedElementProps {
  id: string
  data: any
  type: string
  config?: any
}

export class EmbeddedElement extends React.Component <IEmbeddedElementProps> {
  private entityManager: EntityManager

  constructor(props: IEmbeddedElementProps) {
    super(props)
    if (props.data) {
      this.entityManager = EntityManager.fromJSON({}, props.data?.entities || props.data?.layout?.entities);
    } else {
      this.entityManager = new EntityManager();
    }

    this.onUpdate = this.onUpdate.bind(this);
  }


  onUpdate(additionalData?: any) {
    const { id } = this.props;
    if (this.isWriteable()) {
      const diagramData = JSON.stringify({
        entities: this.entityManager.toJSON(),
        ...additionalData
      })
      localStorage.setItem(id, diagramData)
    }
  }

  isWriteable(): boolean {
    const { config } = this.props;
    return config?.writeable !== undefined ? config.writeable : true;
  }

  render() {
    const { data, type } = this.props;
    const { entities, ...rest } = data;

    let Element;
    switch (type) {
      case 'EntityTable':
        Element = EntityTableWrapper
        break;
      default:
        Element = NetworkDiagramWrapper
        break;
    }

    return (
      <Element
        entityManager={this.entityManager}
        onUpdate={this.onUpdate}
        writeable={this.isWriteable()}
        layoutData={rest}
      />
    )
  }
}
