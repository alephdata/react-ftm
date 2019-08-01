import React from 'react'
import { FocusStyleManager } from '@blueprintjs/core';
import { GraphLayout, GraphEditor, GraphConfig, GraphContext, Viewport } from '@alephdata/vislib';
import { defaultModel, Model} from '@alephdata/followthemoney'

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/select/lib/css/blueprint-select.css'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import './App.css';

FocusStyleManager.onlyShowFocusOnTabs();

const model = new Model(defaultModel)
const config = new GraphConfig()
const demoKeyLayout = 'LSL_v1'
const demoKeyViewport = 'LSV_v1'

interface IVisState {
  layout: GraphLayout,
  viewport: Viewport
}

export default class Vis2 extends React.Component {
  state: IVisState = {
    layout: new GraphLayout(config, model),
    viewport: new Viewport(config)
  }
  saveTimeout: any

  constructor(props: any) {
    super(props)
    const jsonLayout = localStorage.getItem(demoKeyLayout);
    const jsonViewport = localStorage.getItem(demoKeyViewport);
    if (jsonLayout) {
      this.state.layout = GraphLayout.fromJSON(config, model, JSON.parse(jsonLayout))
      this.state.layout.history.push(this.state.layout.toJSON());
    }
    if (jsonViewport) {
      this.state.viewport = Viewport.fromJSON(config, JSON.parse(jsonViewport))
    }

    this.updateLayout = this.updateLayout.bind(this)
    this.updateViewport = this.updateViewport.bind(this)
  }

  updateLayout(layout: GraphLayout) {
    this.setState({layout})
    clearTimeout(this.saveTimeout)
    this.saveTimeout = setTimeout(() => {
      localStorage.setItem(demoKeyLayout, JSON.stringify(layout.toJSON()))
    }, 1000)
  }

  updateViewport(viewport: Viewport) {
    this.setState({viewport})
    clearTimeout(this.saveTimeout)
    this.saveTimeout = setTimeout(() => {
      localStorage.setItem(demoKeyViewport, JSON.stringify(viewport.toJSON()))
    }, 1000)
  }

  render() {
    const layoutContext = {
      layout:this.state.layout,
      updateLayout:this.updateLayout,
      viewport: this.state.viewport,
      updateViewport:this.updateViewport
    }
    return <GraphContext.Provider value={layoutContext}>
      <GraphEditor
        {...layoutContext}
      />
    </GraphContext.Provider>
  }
}
