import React from 'react'

import { IWrappedElementProps } from 'embed/common';
import { GraphConfig, GraphLayout, Viewport, NetworkDiagram } from 'NetworkDiagram';

const config = new GraphConfig({ editorTheme: "light", toolbarPosition: 'top' });

interface INetworkDiagramState {
  layout: GraphLayout,
  viewport: Viewport
}

export default class NetworkDiagramWrapper extends React.Component <IWrappedElementProps, INetworkDiagramState> {
  constructor(props: IWrappedElementProps) {
    super(props)
    const { layoutData } = props;

    this.state = {
      layout: layoutData?.layout ? GraphLayout.fromJSON(config, layoutData.layout) : new GraphLayout(config),
      viewport: layoutData?.viewport ? Viewport.fromJSON(config, layoutData.viewport) : new Viewport(config),
    }

    this.updateLayout = this.updateLayout.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
  }

  updateLayout(layout: GraphLayout, historyModified = false) {
    this.setState({'layout': layout})

    if (historyModified) {
      this.props.onUpdate({ layout: layout.toJSON() });
    }
  }

  updateViewport(viewport: Viewport) {
    this.setState({'viewport': viewport});
    this.props.onUpdate({ viewport: viewport.toJSON() });
  }

  render() {
    const { entityContext, writeable } = this.props;
    const { layout, viewport } = this.state;

    return (
      <NetworkDiagram
        config={config}
        entityContext={entityContext}
        layout={layout}
        viewport={viewport}
        updateLayout={this.updateLayout}
        updateViewport={this.updateViewport}
        writeable={writeable}
      />
    )
  }
}
