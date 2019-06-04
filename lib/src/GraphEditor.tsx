import * as React from 'react'
import { Button, ButtonGroup } from '@blueprintjs/core';
import { GraphRenderer } from './renderer/GraphRenderer'
import { IGraphContext } from './GraphContext'
import { Toolbar } from './Toolbar';
import { Sidebar } from './Sidebar';


export class GraphEditor extends React.Component<IGraphContext> {
  constructor(props: any) {
    super(props)
    this.onZoom = this.onZoom.bind(this)
  }

  onZoom(factor: number) {
    const {layout, updateLayout} = this.props
    const {viewport} = layout
    const newZoomLevel = viewport.zoomLevel * factor
    layout.viewport = viewport.setZoom(newZoomLevel)
    updateLayout(layout)
  }

  render() {
    const { layout, updateLayout } = this.props
    const config = layout.config
    return (
      <div style={{flex: 1, display: 'flex', flexFlow: 'column', height: '100%'}} >
        <div style={{flexGrow: 0, flexShrink: 1, flexBasis: 'auto'}}>
          <Toolbar layout={layout} updateLayout={updateLayout}/>
        </div>
        <div style={{flex: 1, display: 'flex', flexFlow: 'row', flexGrow: 1, flexShrink: 1, flexBasis: '100%'}}>
          <div style={{flexGrow: 4, flexShrink: 1, flexBasis: 'auto', position: 'relative', overflow:'hidden'}}>
            <div style={{position: 'absolute', bottom: '5px', left: '10px'}}>
              <ButtonGroup vertical>
                <Button icon="zoom-in" onClick={() => this.onZoom(0.8)}/>
                <Button icon="zoom-out" onClick={() => this.onZoom(1.2)}/>
              </ButtonGroup>
            </div>
            <GraphRenderer layout={layout} updateLayout={updateLayout}/>
          </div>
          <div style={{
            flexGrow: 1,
            flexShrink: 1,
            maxHeight: '100%',
            boxSizing: 'border-box',
            overflowY: 'scroll',
            flexBasis: '10vw',
            borderLeftWidth: '1px',
            borderLeftStyle: 'solid',
            borderLeftColor: config.BORDER_COLOR,
            padding: config.contentPadding
          }}>
            <Sidebar layout={layout} updateLayout={updateLayout}/>
          </div>
        </div>
      </div>
    );
  }
}
