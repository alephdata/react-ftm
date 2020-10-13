import React from 'react'
import { IWrappedElementProps } from 'embed/common';
import { GraphConfig, GraphLayout, Viewport, NetworkDiagram } from 'NetworkDiagram';

const config = new GraphConfig({ editorTheme: "dark", toolbarPosition: 'top' });

interface INetworkDiagramState {
  layout: GraphLayout,
  locale?: string,
  viewport: Viewport
}

export default class NetworkDiagramWrapper extends React.Component <IWrappedElementProps, INetworkDiagramState> {
  constructor(props: IWrappedElementProps) {
    super(props)

    if (props.layoutData) {
      this.state = {
        layout: GraphLayout.fromJSON(config, props.layoutData.layout),
        viewport: Viewport.fromJSON(config, props.layoutData.viewport),
      }
    } else {
      this.state = {
        layout: new GraphLayout(config),
        viewport: new Viewport(config)
      }
    }

    this.updateLayout = this.updateLayout.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
  }

  updateLayout(layout: GraphLayout, historyModified = false) {
    this.setState({'layout': layout})

    if (historyModified) {
      this.propagateUpdate({ layout });
    }
  }

  updateViewport(viewport: Viewport) {
    this.setState({'viewport': viewport})
    this.propagateUpdate({ viewport });
  }

  propagateUpdate({ layout, viewport }: { layout?: GraphLayout, viewport?: Viewport }) {
    const graphData = {
      layout: layout ? layout.toJSON() : this.state.layout.toJSON(),
      viewport: viewport ? viewport.toJSON() : this.state.viewport.toJSON()
    };
    this.props.onUpdate(graphData);
  }

  render() {
    const { entityManager, writeable } = this.props;
    const { layout, viewport } = this.state;

    return (
      <NetworkDiagram
        config={config}
        entityManager={entityManager}
        layout={layout}
        viewport={viewport}
        updateLayout={this.updateLayout}
        updateViewport={this.updateViewport}
        locale="en"
        writeable={writeable}
      />
    )
  }
}
