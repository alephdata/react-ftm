import React from 'react'
import {Classes, FocusStyleManager} from '@blueprintjs/core';
import {IEntityDatum} from '@alephdata/followthemoney';
import {GraphLayout, GraphEditor} from '@alephdata/vislib';
import {defaultModel, Model} from '@alephdata/followthemoney'
import {data} from './resources/az_alievs';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/select/lib/css/blueprint-select.css'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import './App.css';

FocusStyleManager.onlyShowFocusOnTabs();

const model = new Model(defaultModel)
const demoKey = 'LS_v1'

interface IVisState {
  layout: GraphLayout
}

export default class Vis2 extends React.Component {
  state: IVisState = {
    layout: new GraphLayout(model)
  }
  saveTimeout: any

  constructor(props: any) {
    super(props)
    const jsonLayout = localStorage.getItem(demoKey);
    console.log(jsonLayout)
    if (jsonLayout) {
      this.state.layout = GraphLayout.fromJSON(model, JSON.parse(jsonLayout))
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
    return <div className={Classes.DARK}>
      <GraphEditor layout={layout} updateLayout={this.updateLayout}/>
    </div>
  }
}
