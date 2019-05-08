import React from 'react'
import '@blueprintjs/core/lib/css/blueprint.css';
import {Classes, Drawer, FocusStyleManager, PanelStack} from '@blueprintjs/core';
import {IEntityDatum} from '@alephdata/followthemoney';
import {GraphLayout, GraphEditor} from '@alephdata/vislib';
import {defaultModel, Model} from '@alephdata/followthemoney'
import {data} from './resources/az_alievs';
import EntityEditor from "./components/ftm/EntityEditor";

import '@blueprintjs/select/lib/css/blueprint-select.css'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import './App.css';
import {SelectSchema} from "./components/ftm/SelectSchema";
import {CreateEntityStack} from "./components/CreateEntityStack";

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
    // const jsonLayout = localStorage.getItem(demoKey)
    // if (!jsonLayout) {
    // this.state.layout = GraphLayout.fromJSON(model, JSON.parse(jsonLayout))
    // } else {
    const entities = data.map(rawEntity => this.state.layout.model.getEntity(rawEntity as unknown as IEntityDatum));
    entities.forEach((entity) => this.state.layout.appendEntity(entity))
    this.state.layout.layout()
    // }
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
    const theEntity = Array.from(layout.entities.values())[2];
    return <div className={Classes.DARK}>
      <GraphEditor layout={layout} updateLayout={this.updateLayout}/>
      <Drawer isOpen={!!theEntity} lazy={true} usePortal={false} hasBackdrop={false} className={Classes.CALLOUT}>
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            <EntityEditor entity={theEntity} layout={layout} updateLayout={this.updateLayout} />
          </div>
        </div>
      </Drawer>
    </div>
  }
}
