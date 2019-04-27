import React from 'react'
import ReactDOM from 'react-dom'
import { GraphRenderer } from './GraphRenderer'
import { defaultModel, Model, IEntityDatum } from '@alephdata/followthemoney'
import { Graph } from './Graph'
import { data } from '../resources/az_alievs.js'

const model = new Model(defaultModel)

interface IVisState {
  graph: Graph
}

export class Vis2 extends React.Component {
  state: IVisState = {
    graph: new Graph(model)
  }

  constructor(props: any) {
    super(props)
    this.addSampleData = this.addSampleData.bind(this)
    this.updateGraph = this.updateGraph.bind(this)
  }

  addSampleData() {
    const { graph } = this.state;
    const entities = data.map(rawEntity => model.getEntity(rawEntity as unknown as IEntityDatum));
    entities.forEach((entity) => graph.addEntity(entity))
    this.updateGraph(graph)
  }

  updateGraph(graph: Graph) {
    this.setState({ graph })
    console.log(graph.toJSON())
  }

  render() {
    const { graph } = this.state;
    return (
      <div>
        <div>
          <button onClick={this.addSampleData}>add our friends</button>
        </div>
        <div>
          <GraphRenderer graph={graph} updateGraph={this.updateGraph} />
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <Vis2/>,
  document.querySelector('#app')
)

