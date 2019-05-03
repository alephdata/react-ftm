import * as React from 'react'
import { Button, ButtonGroup } from '@blueprintjs/core';
import { GraphLayout, GraphUpdateHandler } from './layout/GraphLayout'
import { GraphRenderer } from './renderer/GraphRenderer'
import { Toolbar } from './Toolbar';

export interface IGraphEditorProps {
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler
}

export class GraphEditor extends React.Component<IGraphEditorProps> {
  constructor(props: any) {
    super(props)
    this.onZoom = this.onZoom.bind(this)
  }

  onZoom(factor: number) {
    const {layout, updateLayout} = this.props
    const {viewport} = layout
    const newZoomLevel = viewport.zoomLevel * factor
    layout.viewport = viewport.setZoom(viewport.center, newZoomLevel)
    updateLayout(layout)
  }

  render() {
    const {layout, updateLayout} = this.props;
    return (
      <div style={{flex: 1, display: 'flex', flexFlow: 'column', height: '100%'}}>
        <div style={{flexGrow: 0, flexShrink: 1, flexBasis: 'auto'}}>
          <Toolbar layout={layout} updateLayout={updateLayout}/>
        </div>
        <div style={{flexGrow: 1, flexShrink: 1, flexBasis: '100%', position: 'relative'}}>
          <div style={{position: 'absolute', top: '10px', right: '10px'}}>
            <ButtonGroup minimal={true} vertical>
              <Button icon="zoom-in" onClick={() => this.onZoom(0.8)}/>
              <Button icon="zoom-out" onClick={() => this.onZoom(1.2)}/>
            </ButtonGroup>
          </div>
          <GraphRenderer layout={layout} updateLayout={updateLayout}/>
        </div>
      </div>
    );
  }
}
