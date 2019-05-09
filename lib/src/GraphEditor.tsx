import * as React from 'react'
import {Button, ButtonGroup, Classes, Drawer} from '@blueprintjs/core';
import { GraphLayout, GraphUpdateHandler } from './layout/GraphLayout'
import { GraphRenderer } from './renderer/GraphRenderer'
import { Toolbar } from './Toolbar';
import { CreateEntity } from "./ftm/CreateEntity";
import { GraphConfig } from './GraphConfig';

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
          <Drawer isOpen={false} lazy={true}  size="360p" hasBackdrop={false} className={Classes.CALLOUT}>
            <div className={Classes.DRAWER_BODY}>
              <div className={Classes.DIALOG_BODY}>
                <CreateEntity
                  layout={layout}
                  subsequentOf={layout.model.getSchema('Interval')}
                  updateLayout={this.props.updateLayout}
                />
              </div>
            </div>
          </Drawer>
        </div>
        <div style={{flexGrow: 1, flexShrink: 1, flexBasis: '100%', position: 'relative'}}>
          <div style={{position: 'absolute', top: '5px', right: '10px'}}>
            <ButtonGroup vertical>
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
