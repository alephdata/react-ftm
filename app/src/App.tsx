import React from 'react'
import { FocusStyleManager } from '@blueprintjs/core';
import { GraphLayout, GraphEditor, GraphConfig, GraphContext } from '@alephdata/vislib';
import { defaultModel, Model} from '@alephdata/followthemoney'
import {ToolBox} from "./components/ToolBox";

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/select/lib/css/blueprint-select.css'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import './App.css';

FocusStyleManager.onlyShowFocusOnTabs();

const model = new Model(defaultModel)
const config = new GraphConfig()
const demoKey = 'LS_v1'

interface IVisState {
  layout: GraphLayout
}

export default class Vis2 extends React.Component {
  state: IVisState = {
    layout: new GraphLayout(config, model)
  }
  saveTimeout: any

  constructor(props: any) {
    super(props)
    const jsonLayout = localStorage.getItem(demoKey);
    if (jsonLayout) {
      this.state.layout = GraphLayout.fromJSON(config, model, JSON.parse(jsonLayout))
      this.state.layout.history.push(this.state.layout.toJSON());
    }
    this.updateLayout = this.updateLayout.bind(this)
  }

  updateLayout(layout: GraphLayout) {
    this.setState({layout})
    clearTimeout(this.saveTimeout)
    this.saveTimeout = setTimeout(() => {
      localStorage.setItem(demoKey, JSON.stringify(layout.toJSON()))
    }, 1000)
  }

  render() {
    const layoutContext = {
      layout:this.state.layout,
      updateLayout:this.updateLayout
    }
    return <GraphContext.Provider value={layoutContext}>
      <GraphEditor
        {...layoutContext}
        toolbarProps={{
          tools: <ToolBox {...layoutContext} />
        }}
      />
    </GraphContext.Provider>
  }
}
