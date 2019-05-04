import * as React from 'react'
import { Component } from 'react';
import {Button, ButtonGroup, Divider, Tooltip} from "@blueprintjs/core";
import {GraphLayout, GraphUpdateHandler} from "./layout/GraphLayout";
import { Rectangle } from './layout/Rectangle';


interface IToolbarProps {
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler
}

export class Toolbar extends Component<IToolbarProps> {
  constructor(props: Readonly<IToolbarProps>) {
    super(props);
    this.onToggleSelectionMode = this.onToggleSelectionMode.bind(this)
    this.onFitToSelection = this.onFitToSelection.bind(this)
  }

  onToggleSelectionMode() {
    const {layout, updateLayout} = this.props
    layout.selectionMode = !layout.selectionMode
    updateLayout(layout)
  }

  onFitToSelection() {
    const {layout, updateLayout} = this.props
    const selection = layout.getSelection()
    const vertices = selection.length > 0 ? selection : layout.getVertices()
    const points = vertices.map((v) => v.position)
    const rect = Rectangle.fromPoints(...points)
    layout.viewport = layout.viewport.fitToRect(rect)
    updateLayout(layout)
  }

  render() {
    return (
      <ButtonGroup>
        <Tooltip content="Select a group of nodes">
          <Button icon="select" active={this.props.layout.selectionMode} onClick={this.onToggleSelectionMode}/>
        </Tooltip>
        <Tooltip content="Fit view to selection">
          <Button icon="zoom-to-fit" onClick={this.onFitToSelection}/>
        </Tooltip>
        <Divider/>
      </ButtonGroup>
    )
  }
}
