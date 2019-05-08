import * as React from 'react'
import {Button, ButtonGroup, Callout, Divider, Tooltip} from "@blueprintjs/core";
import {GraphLayout, GraphUpdateHandler} from "./layout/GraphLayout";


interface IToolbarProps {
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler
}

export class Toolbar extends React.Component<IToolbarProps> {
  constructor(props: Readonly<IToolbarProps>) {
    super(props);
    this.onToggleSelectionMode = this.onToggleSelectionMode.bind(this)
  }

  onToggleSelectionMode() {
    const {layout, updateLayout} = this.props
    layout.selectionMode = !layout.selectionMode
    updateLayout(layout)
  }

  render() {
    return (
      <ButtonGroup>
        <Tooltip content="Select a group of nodes">
          <Button icon="select" active={this.props.layout.selectionMode} onClick={this.onToggleSelectionMode}/>
        </Tooltip>
        <Divider/>
      </ButtonGroup>
    )
  }
}
