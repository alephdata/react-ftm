import React from 'react'
import { connect, ConnectedProps } from 'react-redux';
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

class EmbeddedElementBase extends React.Component <IEmbeddedElementProps & PropsFromRedux> {
  render() {
    const { config, data, entities, entityContext, onUpdate, type } = this.props;
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

const mapStateToProps = (state: any, ownProps: IEmbeddedElementProps) => {
  const { entityContext } = ownProps;

  return ({
    entities: entityContext.selectEntities(state),
  });
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export const EmbeddedElement = connector(EmbeddedElementBase)
