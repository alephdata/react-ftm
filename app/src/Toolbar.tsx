import React, {Component} from 'react';
import {Button, ButtonGroup, Callout, Divider, Tooltip} from "@blueprintjs/core";
import {GraphLayout, GraphUpdateHandler} from "@alephdata/vis2-lib";
import {data} from "./resources/az_alievs";
import {IEntityDatum} from "@alephdata/followthemoney";

interface IToolbarProps {
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler
}

export default class Toolbar extends Component<IToolbarProps> {
  constructor(props: Readonly<IToolbarProps>) {
    super(props);
    this.onToggleSelectionMode = this.onToggleSelectionMode.bind(this)
    this.addSampleData = this.addSampleData.bind(this)

  }

  onToggleSelectionMode() {
    const {layout, updateLayout} = this.props
    layout.selectionMode = !layout.selectionMode
    updateLayout(layout)
  }

  addSampleData() {
    const {layout} = this.props;
    const entities = data.map(rawEntity => layout.model.getEntity(rawEntity as unknown as IEntityDatum));
    entities.forEach((entity) => layout.addEntity(entity))
    layout.layout()
    this.props.updateLayout(layout)
  }

  render() {
    return (<Callout>
      <ButtonGroup>
        <Tooltip content="Navigate around using mouse">
          <Button icon="hand" active={!this.props.layout.selectionMode} onClick={this.onToggleSelectionMode}/>
        </Tooltip>
        <Divider/>
        <Button onClick={this.addSampleData}>add our friends</Button>
      </ButtonGroup>
    </Callout>)
  }
}