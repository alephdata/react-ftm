import * as React from 'react'
import {GraphLayout, GraphEditor} from '@alephdata/vis2';
import {defaultModel, Model, IEntityDatum} from '@alephdata/followthemoney'
import {Button} from "@blueprintjs/core";
import {data} from './resources/az_alievs.js'

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
    this.addSampleData = this.addSampleData.bind(this)
    this.updateLayout = this.updateLayout.bind(this)
  }

  addSampleData() {
    const {layout} = this.state;
    const entities = data.map(rawEntity => model.getEntity(rawEntity as unknown as IEntityDatum));
    entities.forEach((entity) => layout.addEntity(entity))
    layout.layout()
    this.updateLayout(layout)
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
          <div>
            <Button onClick={this.addSampleData}>add our friends</Button>
          </div>
          <div style={{width: "100%"}}>
            <GraphEditor layout={layout} updateLayout={this.updateLayout}/>
          </div>
        </div>
    );
  }
}
