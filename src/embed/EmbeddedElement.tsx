import React from 'react'

export interface IEmbeddedElementConfig {
  writeable?: boolean
  containerProps?: any
}

export interface IEmbeddedElementProps {
  data: any
  config?: IEmbeddedElementConfig
}

// export class EmbeddedElement extends React.Component <IEmbeddedElementProps> {
//   constructor(props: IEmbeddedElementProps) {
//     super(props)
//
//     if (props.data) {
//       this.state = {
//         entityManager: EntityManager.fromJSON({}, props.data?.entities || props.data?.layout?.entities),
//         layout: GraphLayout.fromJSON(config, props.data.layout),
//         viewport: Viewport.fromJSON(config, props.data.viewport),
//       }
//     } else {
//       this.state = {
//         entityManager: new EntityManager(),
//         layout: new GraphLayout(config),
//         viewport: new Viewport(config)
//       }
//     }
//
//     this.updateLayout = this.updateLayout.bind(this);
//     this.updateViewport = this.updateViewport.bind(this);
//   }
//
//
//   saveToLocalStorage({ entityManager, layout, viewport }: { entityManager?: EntityManager, layout?: GraphLayout, viewport?: Viewport }) {
//     const graphData = JSON.stringify({
//       entities: entityManager ? entityManager.toJSON() : this.state.entityManager.toJSON(),
//       layout: layout ? layout.toJSON() : this.state.layout.toJSON(),
//       viewport: viewport ? viewport.toJSON() : this.state.viewport.toJSON()
//     })
//     localStorage.setItem('storedGraphData', graphData)
//   }
//
//   render() {
//     const { config } = this.props;
//     const { entityManager, layout, viewport } = this.state;
//
//     const writeable = config?.writeable !== undefined ? config.writeable : true;
//
//     return (
//       <NetworkDiagram
//         config={config}
//         entityManager={entityManager}
//         layout={layout}
//         viewport={viewport}
//         updateLayout={this.updateLayout}
//         updateViewport={this.updateViewport}
//         locale="en"
//         writeable={writeable}
//       />
//     )
//   }
// }
