import React from 'react'
import '@blueprintjs/core/lib/css/blueprint.css';
import {GraphLayout} from '@alephdata/vis2-lib';
import {defaultModel, Model} from '@alephdata/followthemoney'
import {GraphEditor} from './GraphEditor';

import './App.css';

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
    const jsonLayout = localStorage.getItem(demoKey)
    if (jsonLayout) {

      this.state.layout = GraphLayout.fromJSON(model, JSON.parse(jsonLayout))
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
    return (
      <div style={{width: "100%"}}>
        <div style={{width: "100%"}}>
          <GraphEditor layout={layout} updateLayout={this.updateLayout}/>
        </div>
      </div>
    );
  }
}
