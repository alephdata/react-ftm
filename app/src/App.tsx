import React from 'react'
import { FocusStyleManager } from '@blueprintjs/core';
import {IEntityDatum} from '@alephdata/followthemoney';
import { GraphLayout, GraphEditor, GraphConfig } from '@alephdata/vislib';
import { defaultModel, Model } from '@alephdata/followthemoney'
import { data } from './resources/az_alievs';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/select/lib/css/blueprint-select.css'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import './App.css';

FocusStyleManager.onlyShowFocusOnTabs();

const model = new Model(defaultModel)
const config = new GraphConfig()
const demoKey = 'LS_v2'

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
    } else {
      const entities = data.map(rawEntity => this.state.layout.model.getEntity(rawEntity as unknown as IEntityDatum));
      entities.forEach((entity) => this.state.layout.appendEntity(entity))
      this.state.layout.layout()
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
    const {layout} = this.state;
    return <GraphEditor layout={layout} updateLayout={this.updateLayout}/>
  }
}
