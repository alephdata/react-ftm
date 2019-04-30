import React from 'react'
import {Button, ButtonGroup} from "@blueprintjs/core";
import { GraphLayout , GraphUpdateHandler, Point, GraphRenderer } from '@alephdata/vis2-lib'

export interface IGraphEditorProps {
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler
}

export class GraphEditor extends React.Component<IGraphEditorProps> {
  constructor(props: any) {
    super(props)
    this.onZoom = this.onZoom.bind(this)
    this.onToggleSelectionMode = this.onToggleSelectionMode.bind(this)
  }

  onZoom(factor: number) {
    const { layout, updateLayout } = this.props
    const { viewport } = layout
    const newZoomLevel = viewport.zoomLevel * factor
    const newCenter = new Point(
      viewport.center.x * -1 * newZoomLevel,
      viewport.center.x * -1 * newZoomLevel
    )
    layout.viewport = viewport.setZoom(newCenter, newZoomLevel)
    updateLayout(layout)
  }

  onToggleSelectionMode() {
    const { layout, updateLayout } = this.props
    layout.selectionMode = !layout.selectionMode
    updateLayout(layout)
  }

  render() {
    const { layout, updateLayout } = this.props;
    return (
      <React.Fragment>
        <div>
          <button onClick={this.onToggleSelectionMode}>s-mode: {layout.selectionMode + ''}</button>
        </div>
        <div style={{borderWidth: 1, borderColor: '#000', borderStyle: 'solid', position: 'relative', width: '100%'}}>
          <div style={{position: 'absolute', top: '2em', right: '2em'}}>
            <ButtonGroup minimal={true} vertical>
              <Button icon="zoom-in" onClick={() => this.onZoom(0.8)}/>
              <Button icon="zoom-out" onClick={() => this.onZoom(1.2)}/>
            </ButtonGroup>
          </div>
          <GraphRenderer layout={layout} updateLayout={updateLayout} />
        </div>
      </React.Fragment>
    );
  }
}
