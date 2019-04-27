import React from 'react'
import ReactDOM from 'react-dom'
import { GraphRenderer } from './GraphRenderer'
import { defaultModel, Model, IEntityDatum } from '@alephdata/followthemoney'
import { GraphLayout } from './GraphLayout'
import { data } from '../resources/az_alievs.js'

const model = new Model(defaultModel)

interface IVisState {
  layout: GraphLayout
}

export class Vis2 extends React.Component {
  state: IVisState = {
    layout: new GraphLayout(model)
  }

  constructor(props: any) {
    super(props)
    this.addSampleData = this.addSampleData.bind(this)
    this.updateLayout = this.updateLayout.bind(this)
  }

  addSampleData() {
    const { layout } = this.state;
    const entities = data.map(rawEntity => model.getEntity(rawEntity as unknown as IEntityDatum));
    entities.forEach((entity) => layout.addEntity(entity))
    this.updateLayout(layout)
  }

  updateLayout(layout: GraphLayout) {
    this.setState({ layout })
    // console.log(layout.toJSON())
  }

  render() {
    const { layout } = this.state;
    return (
      <div>
        <div>
          <button onClick={this.addSampleData}>add our friends</button>
        </div>
        <div>
          <GraphRenderer layout={layout} updateLayout={this.updateLayout} />
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <Vis2/>,
  document.querySelector('#app')
)

