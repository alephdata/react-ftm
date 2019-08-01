import * as React from 'react'
import { Button, ButtonGroup } from '@blueprintjs/core';
import { GraphRenderer } from './renderer/GraphRenderer'
import { GraphLayout } from './layout/GraphLayout';
import { Viewport } from './layout/Viewport';
import { GraphConfig } from './GraphConfig';
import { IGraphContext, GraphContext } from './GraphContext'
import { Toolbar } from './Toolbar';
import { Sidebar } from './Sidebar';
import { History } from './History';
import { Model, defaultModel } from '@alephdata/followthemoney'


interface IVisGraphProps {
  config: GraphConfig,
  model: Model,
  storedLayout: any,
  updateStoredLayout: (layout:any) => void
}

interface IVisGraphState {
  layout: GraphLayout,
  viewport: Viewport
}

export class VisGraph extends React.Component<IVisGraphProps, IVisGraphState> {
  state: IVisGraphState = {
    layout: new GraphLayout(new GraphConfig(), new Model(defaultModel)),
    viewport: new Viewport(new GraphConfig())
  };
  history: History;

  constructor(props: any) {
    super(props)
    const { config, model, storedLayout } = props

    const layout = storedLayout ? GraphLayout.fromJSON(config, model, storedLayout) :
      new GraphLayout(config, model)

    this.state = {
      layout: layout,
      viewport: new Viewport(config)
    };

    this.history = new History();
    if (storedLayout) {
      this.history.push(storedLayout);
    }

    this.onZoom = this.onZoom.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
    this.onHistoryNavigate = this.onHistoryNavigate.bind(this);
  }

  onZoom(factor: number) {
    const { viewport } = this.state;
    if (viewport) {
      const newZoomLevel = viewport.zoomLevel * factor
      this.updateViewport(viewport.setZoom(newZoomLevel))
    }
  }

  updateLayout(layout: GraphLayout, modifyHistory: boolean = false, animate: boolean = false) {
    const { updateStoredLayout } = this.props;

    if (modifyHistory) {
      this.history.push(layout.toJSON())
    }

    this.setState({layout});

    updateStoredLayout(JSON.stringify(layout.toJSON()));
  }

  updateViewport(viewport: Viewport) {
    this.setState({viewport});

    //TODO update stored viewport?
  }

  onHistoryNavigate(factor:number) {
    const { config, model } = this.props;

    const nextLayoutData = this.history.go(factor);
    this.updateLayout(GraphLayout.fromJSON(config, model, nextLayoutData), false)
  }


  render() {
    // const { layout, viewport, updateViewport } = this.props
    // const config = layout.config
    const { config } = this.props;
    const { layout, viewport } = this.state;


    // TODO: do these need to be manually passed to the child components if they're stored in the context?
    const layoutContext = {
      layout: this.state.layout,
      updateLayout: this.updateLayout,
      viewport: this.state.viewport,
      updateViewport: this.updateViewport
    };

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
              <GraphRenderer layout={layout} updateLayout={this.updateLayout} viewport={viewport} updateViewport={this.updateViewport}/>
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
              <Sidebar layout={layout} updateLayout={this.updateLayout} viewport={viewport} updateViewport={this.updateViewport}/>
            </div>
          </div>
        </div>
      </GraphContext.Provider>
    );
  }
}
