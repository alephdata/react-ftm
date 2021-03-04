import React from 'react'
import { connect, ConnectedProps } from 'react-redux';

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
}

class EmbeddedElementBase extends React.Component <IEmbeddedElementProps & PropsFromRedux> {
  constructor(props: IEmbeddedElementProps & PropsFromRedux) {
    super(props)

    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(additionalData?: any) {
    const { id, config, entities } = this.props;
    if (config?.writeable) {
      const updatedData = JSON.stringify({
        entities: entities.results,
        ...additionalData
      })
      localStorage.setItem(id, updatedData)
    }
  }

  render() {
    const { config, data, entityContext, type } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { entities, ...rest } = data;

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
        onUpdate={this.onUpdate}
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
