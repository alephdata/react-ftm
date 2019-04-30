import React from 'react'
// import { Button, ButtonGroup } from "@blueprintjs/core";
import { GraphLayout, GraphUpdateHandler } from './GraphLayout'
import { GraphRenderer } from './GraphRenderer'
import { Point } from './Point';

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
    const target = new Point(
      viewport.center.x,
      viewport.center.x
    )
    layout.viewport = viewport.setZoom(target, newZoomLevel)
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
      <div style={{flex: 1, display: 'flex', flexFlow: 'column', height: '100%'}}>
        <div style={{flexGrow: 0, flexShrink: 1, flexBasis: 'auto'}}>
          <button onClick={this.onToggleSelectionMode}>s-mode: {layout.selectionMode + ''}</button>
        </div>
        <div style={{flexGrow: 1, flexShrink: 1, flexBasis: '100%', position: 'relative'}}>
          <div style={{position: 'absolute', top: '40px', right: '20px'}}>
            <button onClick={() => this.onZoom(0.8)}>+</button>
            <button onClick={() => this.onZoom(1.2)}>-</button>
          </div>
          <GraphRenderer layout={layout} updateLayout={updateLayout} />
        </div>
      </div>
    );
  }
}
