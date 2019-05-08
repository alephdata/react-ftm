import React from 'react'
import '@blueprintjs/core/lib/css/blueprint.css';
import {Classes, Drawer, FocusStyleManager} from '@blueprintjs/core';
import { IEntityDatum } from '@alephdata/followthemoney';
import { GraphLayout, GraphEditor } from '@alephdata/vislib';
import { defaultModel, Model } from '@alephdata/followthemoney'
import { data } from './resources/az_alievs';

import './App.css';
import EntityEditor from "./components/ftm/EntityEditor";

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
      entities.forEach((entity) => this.state.layout.addEntity(entity))
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
    const { layout } = this.state;
    const theEntity = Array.from(layout.entities.values())[1]
    console.log(theEntity, layout.entities)
    return <div>
      <GraphEditor layout={layout} updateLayout={this.updateLayout}/>
      <Drawer isOpen={!!theEntity} lazy={true} hasBackdrop={false}>
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            <EntityEditor
              entity={theEntity}
              updateLayout={this.updateLayout}
              layout={layout}
            />
          </div>
        </div>
      </Drawer>
    </div>
  }
}
