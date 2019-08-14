import * as React from 'react'
import { Button, ButtonGroup } from '@blueprintjs/core';
import { GraphRenderer } from './renderer/GraphRenderer'
import { GraphLayout } from './layout/GraphLayout';
import { Viewport } from './Viewport';
import { GraphConfig } from './GraphConfig';
import { IGraphContext, GraphContext } from './GraphContext'
import { Toolbar } from './Toolbar';
import { Sidebar } from './Sidebar';
import { History } from './History';
import { Model, defaultModel } from '@alephdata/followthemoney'

interface IVisGraphProps {
  config: GraphConfig,
  model: Model,
  layout: GraphLayout,
  viewport: Viewport,
  updateLayout: (layout:GraphLayout, historyModified?: boolean) => void,
  updateViewport: (viewport:Viewport) => void
}

interface IVisGraphState {
  animateTransition: boolean
}

export class VisGraph extends React.Component<IVisGraphProps, IVisGraphState> {
  state: IVisGraphState
  history: History;

  constructor(props: any) {
    super(props)
    const { config, model, layout, viewport } = props

    this.history = new History();
    this.state = {
      animateTransition: false
    };

    if (layout) {
      this.history.push(layout);
    }

    this.onZoom = this.onZoom.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
    this.onHistoryNavigate = this.onHistoryNavigate.bind(this);
  }

  onZoom(factor: number) {
    const { viewport } = this.props;
    if (viewport) {
      const newZoomLevel = viewport.zoomLevel * factor
      this.updateViewport(viewport.setZoom(newZoomLevel), {animate:true})
    }
  }

  updateLayout(layout: GraphLayout, {modifyHistory = false} = {}) {
    const { updateLayout } = this.props;

    if (modifyHistory) {
      this.history.push(layout.toJSON())
    }

    this.setState({animateTransition: false });

    updateLayout(layout, modifyHistory);
  }

  updateViewport(viewport: Viewport, { animate = false } = {}) {
    const { updateViewport } = this.props;

    this.setState({animateTransition: animate});

    updateViewport(viewport);
  }

  onHistoryNavigate(factor:number) {
    const { config, model } = this.props;

    const nextLayoutData = this.history.go(factor);
    this.updateLayout(GraphLayout.fromJSON(config, model, nextLayoutData))
  }

  render() {
    const { config, layout, viewport } = this.props;
    const { animateTransition } = this.state;

    // TODO: do these need to be manually passed to the child components if they're stored in the context?
    const layoutContext = {
      layout: layout,
      updateLayout: this.updateLayout,
      viewport: viewport,
      updateViewport: this.updateViewport
    };

    const showSidebar = layout.vertices && layout.vertices.size > 0

    return (
      <GraphContext.Provider value={layoutContext}>
        <div style={{flex: 1, display: 'flex', flexFlow: 'column', height: '100%'}} >
          <div style={{flexGrow: 0, flexShrink: 1, flexBasis: 'auto'}}>
            <Toolbar
              layout={layout}
              updateLayout={this.updateLayout}
              viewport={viewport}
              updateViewport={this.updateViewport}
              onHistoryNavigate={this.onHistoryNavigate}
              history={this.history}
            />
          </div>
          <div style={{flex: 1, display: 'flex', flexFlow: 'row', flexGrow: 1, flexShrink: 1, flexBasis: '100%'}}>
            <div style={{flexGrow: 4, flexShrink: 1, flexBasis: 'auto', position: 'relative', overflow:'hidden'}}>
              <div style={{position: 'absolute', bottom: '5px', left: '10px'}}>
                <ButtonGroup vertical>
                  <Button icon="zoom-in" onClick={() => this.onZoom(0.8)}/>
                  <Button icon="zoom-out" onClick={() => this.onZoom(1.2)}/>
                </ButtonGroup>
              </div>
              <GraphRenderer layout={layout} updateLayout={this.updateLayout} viewport={viewport} updateViewport={this.updateViewport} animateTransition={animateTransition}/>
            </div>
            {showSidebar &&
              <div style={{
                flexGrow: 1,
                flexShrink: 1,
                maxHeight: '100%',
                boxSizing: 'border-box',
                overflowY: 'scroll',
                flexBasis: '15vw',
                minWidth: '200px',
                maxWidth: '260px'
              }}>
                <Sidebar layout={layout} updateLayout={this.updateLayout} viewport={viewport} updateViewport={this.updateViewport}/>
              </div>
            }
          </div>
        </div>
      </GraphContext.Provider>
    );
  }
}
