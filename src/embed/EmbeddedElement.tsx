import React from 'react'
import { Entity } from '@alephdata/followthemoney';

import NetworkDiagramWrapper from 'embed/NetworkDiagramWrapper';
import EntityTableWrapper from 'embed/EntityTableWrapper';
// import HistogramWrapper from 'embed/HistogramWrapper';
import { IEntityContext } from 'contexts/EntityContext';

export interface IEmbeddedElementProps {
  entityContext: IEntityContext
  id: string
  data: any
  type: string
  config?: any
  onUpdate?: (entities: Array<Entity>, layoutData: any) => void
}

export class EmbeddedElement extends React.Component <IEmbeddedElementProps> {
  render() {
    const { config, data, entityContext, onUpdate, type } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { e, ...rest } = data;

    let Element;
    switch (type) {
      case 'EntityTable':
        Element = EntityTableWrapper
        break;
      // case 'Histogram':
      //   return <HistogramWrapper />
      //   break;
      default:
        Element = NetworkDiagramWrapper
        break;
    }

    return (
      <Element
        entityContext={entityContext}
        onUpdate={onUpdate}
        writeable={config?.writeable}
        layoutData={rest}
      />
    )
  }
}
