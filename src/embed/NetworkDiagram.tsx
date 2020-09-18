import React from 'react'
import { IEmbeddedElementProps } from './common';
import { EntityManager, GraphConfig, GraphLayout, Viewport, VisGraph } from '../';

const config = new GraphConfig({ editorTheme: "dark", toolbarPosition: 'top' });
const entityManager = new EntityManager();

interface INetworkDiagramProps extends IEmbeddedElementProps {}

interface INetworkDiagramState {
  layout: GraphLayout,
  locale?: string,
  viewport: Viewport
}

export default class NetworkDiagram extends React.Component <INetworkDiagramProps, INetworkDiagramState> {
  constructor(props: INetworkDiagramProps) {
    super(props)

    // const storedGraphData = localStorage.getItem('storedGraphData')

    if (props.data) {
      this.state = {
        // @ts-ignore
        layout: GraphLayout.fromJSON(config, entityManager, props.data.layout),
        viewport: Viewport.fromJSON(config, props.data.viewport),
      }
    } else {
      this.state = {
        // @ts-ignore
        layout: new GraphLayout(config, entityManager),
        viewport: new Viewport(config)
      }
    }

    this.updateLayout = this.updateLayout.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
  }

  updateLayout(layout: GraphLayout, historyModified: boolean = false) {
    this.setState({'layout': layout})

    // if (historyModified) {
    //   this.saveToLocalStorage({ layout });
    // }
  }

  updateViewport(viewport: Viewport) {
    this.setState({'viewport': viewport})
    // this.saveToLocalStorage({ viewport });
  }

  saveToLocalStorage({ layout, viewport }: { layout?: GraphLayout, viewport?: Viewport }) {
    const graphData = JSON.stringify({
      layout: layout ? layout.toJSON() : this.state.layout.toJSON(),
      viewport: viewport ? viewport.toJSON() : this.state.viewport.toJSON()
    })
    localStorage.setItem('storedGraphData', graphData)
  }

  render() {
    const { layout, viewport } = this.state;

    return (
      <VisGraph
        config={config}
        entityManager={entityManager}
        layout={layout}
        viewport={viewport}
        updateLayout={this.updateLayout}
        updateViewport={this.updateViewport}
        exportSvg={null}
        locale="en"
        writeable
      />
    )
  }
}
