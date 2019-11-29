import * as React from 'react'
import { Button, ButtonGroup, Classes, Drawer, Position, Tooltip } from '@blueprintjs/core';
import { GraphConfig } from './GraphConfig';
import { GraphRenderer } from './renderer/GraphRenderer'
import { GraphLayout, Rectangle, Point } from './layout';
import { Viewport } from './Viewport';
import { IGraphContext, GraphContext } from './GraphContext'
import { Toolbar } from './Toolbar';
import { Sidebar } from './Sidebar';
import { History } from './History';
import { EdgeCreateDialog, GroupingCreateDialog, VertexCreateDialog, TableEditor } from "./editor";
import { modes } from './interactionModes'

interface IVisGraphProps {
  config: GraphConfig,
  layout: GraphLayout,
  viewport: Viewport,
  updateLayout: (layout:GraphLayout, historyModified?: boolean) => void,
  updateViewport: (viewport:Viewport) => void
  exportSvg: (data: any) => void
  writeable: boolean
}

interface IVisGraphState {
  animateTransition: boolean
  interactionMode: string
  tableView: boolean
  vertexCreateInitialPos?: Point
}

export class VisGraph extends React.Component<IVisGraphProps, IVisGraphState> {
  state: IVisGraphState;
  history: History;
  svgRef: React.RefObject<SVGSVGElement>

  constructor(props: any) {
    super(props)
    const { config, layout, viewport } = props

    this.history = new History();
    this.svgRef = React.createRef()

    if (layout) {
      this.history.push(layout);
    }

    this.state = {
      animateTransition: false,
      interactionMode: props.writeable ? modes.SELECT : modes.PAN,
      tableView: false,
    };

    this.addVertexToPosition = this.addVertexToPosition.bind(this)
    this.exportSvg = this.exportSvg.bind(this);
    this.fitToSelection = this.fitToSelection.bind(this)
    this.navigateHistory = this.navigateHistory.bind(this);
    this.onZoom = this.onZoom.bind(this);
    this.removeSelection = this.removeSelection.bind(this)
    this.setInteractionMode = this.setInteractionMode.bind(this)
    this.toggleTableView = this.toggleTableView.bind(this)
    this.ungroupSelection = this.ungroupSelection.bind(this)
    this.updateLayout = this.updateLayout.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
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

  navigateHistory(factor:number) {
    const { config } = this.props;

    const nextLayoutData = this.history.go(factor);
    this.updateLayout(GraphLayout.fromJSON(config, nextLayoutData))
  }

  addVertexToPosition(initialPos?: Point) {
    this.setState({
      interactionMode: modes.VERTEX_CREATE,
      vertexCreateInitialPos: initialPos
    })
  }

  setInteractionMode(newMode?: string) {
    this.setState({ interactionMode: newMode || modes.SELECT })
  }

  toggleTableView() {
    this.setState({ tableView: !this.state.tableView })
  }

  fitToSelection() {
    const {layout, viewport} = this.props
    const selection = layout.getSelectedVertices()
    const vertices = selection.length > 0 ? selection : layout.getVertices()
    const points = vertices.filter((v) => !v.isHidden()).map((v) => v.position)
    const rect = Rectangle.fromPoints(...points)
    this.updateViewport(viewport.fitToRect(rect), {animate:true})
  }


  removeSelection() {
    const { layout } = this.props
    layout.removeSelection()
    this.updateLayout(layout, {modifyHistory:true})
  }

  ungroupSelection() {
    const { layout } = this.props
    layout.ungroupSelection()
    this.updateLayout(layout, {modifyHistory:true})
  }

  exportSvg() {
    const {layout, viewport} = this.props
    const svgData = this.svgRef.current
    const points = layout.getVertices().filter((v) => !v.isHidden()).map((v) => v.position)
    const rect = Rectangle.fromPoints(...points)
    const viewBox = viewport.fitToRect(rect).viewBox;

    if (svgData) {
      const svgClone = svgData.cloneNode(true) as HTMLElement
      svgClone.setAttribute("viewBox",viewBox as string)

      const canvas = svgClone.querySelector("#canvas-handle")
      canvas && canvas.setAttribute('fill', 'none');

      const svgBlob = new XMLSerializer().serializeToString(svgClone)
      this.props.exportSvg(svgBlob)
    }
  }

  render() {
    const { config, layout, viewport, writeable } = this.props;
    const { animateTransition, interactionMode, tableView } = this.state;
    const vertices = layout.getSelectedVertices()
    const [sourceVertex, targetVertex] = vertices;

    const layoutContext = {
      layout: layout,
      updateLayout: this.updateLayout,
      viewport: viewport,
      updateViewport: this.updateViewport,
    };

    const actions = {
      addVertexToPosition: this.addVertexToPosition,
      exportSvg: this.exportSvg,
      fitToSelection: this.fitToSelection,
      navigateHistory: this.navigateHistory,
      removeSelection: this.removeSelection,
      setInteractionMode: this.setInteractionMode,
      toggleTableView: this.toggleTableView,
      ungroupSelection: this.ungroupSelection,
    };

    const showSidebar = writeable && layout.vertices && layout.vertices.size > 0;

    return (
      <GraphContext.Provider value={layoutContext}>
        <div style={{flex: 1, display: 'flex', flexFlow: 'column', height: '100%'}} >
          <div style={{flexGrow: 0, flexShrink: 1, flexBasis: 'auto'}}>
            <Toolbar
              actions={actions}
              history={this.history}
              interactionMode={this.state.interactionMode}
              showEditingButtons={writeable}
              {...layoutContext}
            />
          </div>
          <div style={{flex: 1, display: 'flex', flexFlow: 'row', flexGrow: 1, flexShrink: 1, flexBasis: '100%', overflow: 'hidden'}}>
            <div style={{flexGrow: 4, flexShrink: 1, flexBasis: 'auto', position: 'relative', overflow:'hidden'}}>
              <div style={{position: 'absolute', bottom: '5px', left: '10px'}}>
                <ButtonGroup vertical>
                  <Tooltip content="Fit view to selection">
                    <Button icon="zoom-to-fit" onClick={this.fitToSelection}/>
                  </Tooltip>
                  <Button icon="zoom-in" onClick={() => this.onZoom(0.8)}/>
                  <Button icon="zoom-out" onClick={() => this.onZoom(1.2)}/>
                </ButtonGroup>
              </div>
              <GraphRenderer
                svgRef={this.svgRef}
                animateTransition={animateTransition}
                actions={actions}
                interactionMode={interactionMode}
                writeable={writeable}
                {...layoutContext}
              />
              <Drawer
                position={Position.BOTTOM}
                icon="th"
                isOpen={tableView}
                canOutsideClickClose
                title="Table viewer"
                onClose={this.toggleTableView}
                style={{ height: '60%' }}
              >
                <div className={Classes.DRAWER_BODY}>
                  <TableEditor layout={layout} updateLayout={this.updateLayout} writeable={writeable} />
                </div>
              </Drawer>
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
                <Sidebar {...layoutContext} />
              </div>
            }
          </div>
        </div>
        {writeable && (
          <>
            <VertexCreateDialog
              isOpen={interactionMode === modes.VERTEX_CREATE}
              toggleDialog={this.setInteractionMode}
              vertexInitialPos={this.state.vertexCreateInitialPos} />

            <GroupingCreateDialog
              isOpen={interactionMode === modes.GROUPING_CREATE}
              toggleDialog={this.setInteractionMode} />

            <EdgeCreateDialog
              source={sourceVertex}
              target={targetVertex}
              isOpen={interactionMode === modes.EDGE_CREATE}
              toggleDialog={this.setInteractionMode}
              {...layoutContext}
            />
          </>
        )}
      </GraphContext.Provider>
    );
  }
}
