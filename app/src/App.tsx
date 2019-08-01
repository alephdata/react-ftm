import React from 'react'
import { FocusStyleManager } from '@blueprintjs/core';
import { VisGraph, GraphConfig } from '@alephdata/vislib';
import { defaultModel, Model} from '@alephdata/followthemoney'

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/select/lib/css/blueprint-select.css'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import './App.css';

FocusStyleManager.onlyShowFocusOnTabs();

const model = new Model(defaultModel)
const config = new GraphConfig()
const demoKey = 'LS_v1'

export default class Vis2 extends React.Component {
  // state: IVisState = {
  //   layout: new GraphLayout(config, model),
  //   viewport: new Viewport(config)
  // }
  saveTimeout: any
  storedLayout: any

  constructor(props: any) {
    super(props)
    const localStorageContents = localStorage.getItem(demoKey);

    if (localStorageContents) {
      this.storedLayout = JSON.parse(localStorageContents)
    }

    //   this.state.layout = GraphLayout.fromJSON(config, model, JSON.parse(jsonLayout))
    //   this.state.layout.history.push(this.state.layout.toJSON());
    // }
    // if (jsonViewport) {
    //   this.state.viewport = Viewport.fromJSON(config, JSON.parse(jsonViewport))
    // }
    //
    // this.updateLayout = this.updateLayout.bind(this)
    // this.updateViewport = this.updateViewport.bind(this)

    this.updateStoredLayout = this.updateStoredLayout.bind(this);
  }

  // updateLayout(layout: GraphLayout) {
  //   this.setState({layout})
  //   clearTimeout(this.saveTimeout)
  //   this.saveTimeout = setTimeout(() => {
  //     localStorage.setItem(demoKey, JSON.stringify(layout.toJSON()))
  //   }, 1000)
  // }
  //
  // updateViewport(viewport: Viewport) {
  //   this.setState({viewport})
  //   clearTimeout(this.saveTimeout)
  //   this.saveTimeout = setTimeout(() => {
  //     localStorage.setItem(demoKeyViewport, JSON.stringify(viewport.toJSON()))
  //   }, 1000)
  // }

  updateStoredLayout(storedLayout: any) {
    this.storedLayout = storedLayout;

    clearTimeout(this.saveTimeout)
    this.saveTimeout = setTimeout(() => {
      localStorage.setItem(demoKey, storedLayout)
    }, 1000)
  }

  render() {
    return (
      <VisGraph
        config={config}
        model={model}
        storedLayout={this.storedLayout}
        updateStoredLayout={this.updateStoredLayout}
      />
    )
  }
}
