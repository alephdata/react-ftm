import React from 'react'
import { IEmbeddedElementProps } from './util';

import { EntityManager } from 'components/common'
import { GraphConfig, GraphLayout, Viewport, NetworkDiagram } from 'NetworkDiagram';

const config = new GraphConfig({ editorTheme: "dark", toolbarPosition: 'top' });

interface INetworkDiagramState {
  layout: GraphLayout,
  locale?: string,
  viewport: Viewport
  entityManager: EntityManager
}

export default class NetworkDiagramWrapper extends React.Component <IEmbeddedElementProps, INetworkDiagramState> {
  constructor(props: IEmbeddedElementProps) {
    super(props)

    if (props.data) {
      this.state = {
        entityManager: EntityManager.fromJSON({}, props.data?.entities || props.data?.layout?.entities),
        layout: GraphLayout.fromJSON(config, props.data.layout),
        viewport: Viewport.fromJSON(config, props.data.viewport),
      }
    } else {
      this.state = {
        entityManager: new EntityManager(),
        layout: new GraphLayout(config),
        viewport: new Viewport(config)
      }
    }

    this.updateLayout = this.updateLayout.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
  }

  updateLayout(layout: GraphLayout, historyModified = false) {
    this.setState({'layout': layout})

    if (this.props.config?.writeable && historyModified) {
      this.saveToLocalStorage({ layout });
    }
  }

  updateViewport(viewport: Viewport) {
    this.setState({'viewport': viewport})
    if (this.props.config?.writeable) {
      this.saveToLocalStorage({ viewport });
    }
  }

  saveToLocalStorage({ entityManager, layout, viewport }: { entityManager?: EntityManager, layout?: GraphLayout, viewport?: Viewport }) {
    const graphData = JSON.stringify({
      entities: entityManager ? entityManager.toJSON() : this.state.entityManager.toJSON(),
      layout: layout ? layout.toJSON() : this.state.layout.toJSON(),
      viewport: viewport ? viewport.toJSON() : this.state.viewport.toJSON()
    })
    localStorage.setItem('storedGraphData', graphData)
  }

  render() {
    const { entityManager, layout, viewport } = this.state;

    return (
      <NetworkDiagram
        config={config}
        entityManager={entityManager}
        layout={layout}
        viewport={viewport}
        updateLayout={this.updateLayout}
        updateViewport={this.updateViewport}
        locale="en"
        writeable
      />
    )
  }
}
