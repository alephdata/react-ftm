import * as React from 'react'
import c from 'classnames';
import { Entity, IEntityDatum } from "@alephdata/followthemoney";
import { Button, ButtonGroup, Classes, Position, Tooltip } from '@blueprintjs/core';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { EntityManager } from './EntityManager';
import { GraphConfig } from './GraphConfig';
import { GraphRenderer } from './renderer/GraphRenderer'
import { GraphLayout, Rectangle, Point, Settings, Vertex } from './layout';
import { Viewport } from './Viewport';
import { IGraphContext, GraphContext } from './GraphContext'
import { Sidebar, TableView, Toolbar, VertexMenu } from './components';
import { History } from './History';
import { EdgeCreateDialog, GroupingCreateDialog, SettingsDialog, VertexCreateDialog } from './dialogs';
import { filterVerticesByText, modes, showSuccessToast, showWarningToast } from './utils'


import './VisGraph.scss';

const messages = defineMessages({
  tooltip_fit_selection: {
    id: 'tooltips.fit_to_selection',
    defaultMessage: 'Fit view to selection',
  },
  expand_success: {
    id: 'toasts.expand_success',
    defaultMessage: `Successfully added {vertices} new
      {vertices, plural, one {node} other {nodes}}
      and {edges} new
      {edges, plural, one {link} other {links}}
      to the diagram`,
  },
  expand_none: {
    id: 'toasts.expand_none',
    defaultMessage: 'All expansion results are already present in the diagram',
  },
});

export interface IVisGraphProps extends WrappedComponentProps {
  config: GraphConfig,
  locale?: string
  entityManager: EntityManager
  layout: GraphLayout,
  viewport: Viewport,
  updateLayout: (layout:GraphLayout, options?: any) => void,
  updateViewport: (viewport:Viewport) => void
  exportSvg: (data: any) => void
  writeable: boolean
  externalFilterText?: string
}

interface IVisGraphState {
  animateTransition: boolean
  interactionMode: string
  searchText: string
  tableView: boolean
  settingsDialogOpen: boolean
  vertexCreateOptions?: any
  vertexMenuSettings: any,
}

class VisGraphBase extends React.Component<IVisGraphProps, IVisGraphState> {
  state: IVisGraphState;
  history: History;
  svgRef: React.RefObject<SVGSVGElement>

  constructor(props: IVisGraphProps) {
    super(props)
    const { config, externalFilterText, layout, viewport, writeable } = props

    this.history = new History();
    this.svgRef = React.createRef()

    if (layout) {
      this.history.push({layout:layout.toJSON()});
    }

    this.state = {
      animateTransition: false,
      interactionMode: writeable ? modes.SELECT : modes.PAN,
      tableView: false,
      searchText: externalFilterText || '',
      vertexMenuSettings: null,
      settingsDialogOpen: false,
    };

    this.addVertex = this.addVertex.bind(this)
    this.exportSvg = this.exportSvg.bind(this);
    this.fitToSelection = this.fitToSelection.bind(this)
    this.navigateHistory = this.navigateHistory.bind(this);
    this.onZoom = this.onZoom.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
    this.removeSelection = this.removeSelection.bind(this)
    this.setInteractionMode = this.setInteractionMode.bind(this)
    this.toggleTableView = this.toggleTableView.bind(this)
    this.ungroupSelection = this.ungroupSelection.bind(this)
    this.updateLayout = this.updateLayout.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
    this.hideVertexMenu = this.hideVertexMenu.bind(this);
    this.showVertexMenu = this.showVertexMenu.bind(this);
    this.toggleSettingsDialog = this.toggleSettingsDialog.bind(this);
    this.expandVertex = this.expandVertex.bind(this);
  }

  componentDidMount() {
    const { externalFilterText } = this.props;

    if (externalFilterText) {
      this.onChangeSearch(externalFilterText);
    }
  }

  componentDidUpdate(prevProps: IVisGraphProps) {
    const { externalFilterText } = this.props;

    if (externalFilterText !== undefined && prevProps.externalFilterText !== externalFilterText) {
      this.onChangeSearch(externalFilterText);
    }
  }

  onZoom(factor: number) {
    const { viewport } = this.props;
    if (viewport) {
      const newZoomLevel = viewport.zoomLevel * factor
      this.updateViewport(viewport.setZoom(newZoomLevel), {animate:true})
    }
  }

  onChangeSearch(searchText: string) {
    const { layout } = this.props

    if (searchText.length > 0) {
      const predicate = filterVerticesByText(searchText);
      layout.selectVerticesByFilter(predicate);
    } else {
      layout.clearSelection();
    }
    this.setState({ searchText });
    this.updateLayout(layout, null, { modifyHistory: false })
  }

  onSubmitSearch(event: React.FormEvent) {
    this.fitToSelection();
    event.preventDefault();
    event.stopPropagation();
  }

  updateLayout(layout: GraphLayout, entityChanges?: any, options?: any) {
    if (options?.modifyHistory) {
      this.history.push({layout:layout.toJSON(), entityChanges: entityChanges});
    }

    this.setState(({ searchText }) => ({
      animateTransition: false,
      searchText: options?.clearSearch ? '' : searchText
    }));

    this.props.updateLayout(layout, {
      propagate: options?.modifyHistory || options?.forceSaveUpdate,
      clearSearch: options?.clearSearch,
    });
  }

  updateViewport(viewport: Viewport, { animate = false } = {}) {
    const { updateViewport } = this.props;

    this.setState({animateTransition: animate});

    updateViewport(viewport);
  }

  navigateHistory(factor:number) {
    const { config, entityManager } = this.props;

    const { layout, entityChanges } = this.history.go(factor);

    if (entityChanges) {
      entityManager.applyEntityChanges(entityChanges, factor);
    }

    this.updateLayout(GraphLayout.fromJSON(config, entityManager, layout), null, { forceSaveUpdate: true })
  }

  addVertex(options?: any) {
    this.setState({
      interactionMode: modes.VERTEX_CREATE,
      vertexCreateOptions: options
    })
  }

  async showVertexMenu(vertex: Vertex, position: Point, onlyShowExpand: boolean = false) {
    const { entityManager } = this.props;
    const menuSettings = { vertex, position, anchor: 'top', onlyShowExpand };

    const docHeight = document.body.clientHeight;
    if (position.y > docHeight/2) {
      menuSettings.anchor = "bottom";
      menuSettings.position = new Point(position.x, docHeight - position.y);
    }

    this.setState({
      vertexMenuSettings: menuSettings,
    })
    if (vertex.entityId) {
      const expandResults = await entityManager.expandEntity(vertex.entityId, undefined, 0);
      this.setState(({vertexMenuSettings}) => ({
        vertexMenuSettings: vertexMenuSettings ? { ...menuSettings, expandResults } : null,
      }))
    }
  }

  hideVertexMenu() {
    this.setState({ vertexMenuSettings: null });
  }

  async expandVertex(vertex: Vertex, properties: Array<string>) {
    if (!vertex.entityId) return;
    const { entityManager, intl, layout, viewport } = this.props;

    this.setState({ vertexMenuSettings: null });

    const expandResults = await entityManager.expandEntity(vertex.entityId, properties);
    if (expandResults) {
      const entities = expandResults
        .reduce((entities: Array<Entity>, expandObj: any) => ([...entities, ...expandObj.entities]), [])
        .map((entityData: IEntityDatum) => new Entity(entityManager.model, entityData));

      const before = layout.getVisibleElementCount();
      layout.addEntities(entities as Array<Entity>, viewport.center);
      const after = layout.getVisibleElementCount();
      const vDiff = after.vertices - before.vertices;
      const eDiff = after.edges - before.edges;

      if (vDiff || eDiff) {
        showSuccessToast(intl.formatMessage(messages.expand_success, { vertices: vDiff, edges: eDiff }));
      } else {
        showWarningToast(intl.formatMessage(messages.expand_none));
      }

      this.updateLayout(layout, {}, { modifyHistory: true })
    }
  }

  setInteractionMode(newMode?: string) {
    this.setState({ interactionMode: newMode || modes.SELECT, vertexCreateOptions: null })
  }

  toggleTableView() {
    this.setState(({ tableView }) => ({ tableView: !tableView }))
  }

  toggleSettingsDialog(settings?: any) {
    const { entityManager, layout } = this.props;

    this.setState(({ settingsDialogOpen }) => ({ settingsDialogOpen: !settingsDialogOpen }));

    if (settings) {
      layout.settings = Settings.fromJSON(settings);
      layout.layout();
      this.updateLayout(layout, {}, { modifyHistory: true });
    }
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
    const removedEntities = layout.removeSelection()
    this.updateLayout(layout, { deleted: removedEntities }, { modifyHistory:true })
  }

  ungroupSelection() {
    const { layout } = this.props
    layout.ungroupSelection()
    this.updateLayout(layout, null, { modifyHistory:true })
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
    const { config, entityManager, intl, layout, locale, viewport, writeable } = this.props;
    const { animateTransition, interactionMode, searchText, settingsDialogOpen, tableView, vertexMenuSettings } = this.state;
    const vertices = layout.getSelectedVertices()
    const [sourceVertex, targetVertex] = vertices;

    const layoutContext = {
      layout: layout,
      updateLayout: this.updateLayout,
      viewport: viewport,
      updateViewport: this.updateViewport,
      intl: intl,
    };

    const actions = {
      addVertex: this.addVertex,
      exportSvg: this.exportSvg,
      navigateHistory: this.navigateHistory,
      removeSelection: this.removeSelection,
      setInteractionMode: this.setInteractionMode,
      toggleTableView: this.toggleTableView,
      ungroupSelection: this.ungroupSelection,
      onChangeSearch: this.onChangeSearch,
      onSubmitSearch: this.onSubmitSearch,
      showVertexMenu: this.showVertexMenu,
      expandVertex: this.expandVertex,
      fitToSelection: this.fitToSelection,
      toggleSettingsDialog: this.toggleSettingsDialog,
    };

    const showSidebar = layout.vertices && layout.vertices.size > 0 && !tableView;

    return (
      <GraphContext.Provider value={layoutContext}>
        <div className={c('VisGraph', `toolbar-${config.toolbarPosition}`, `theme-${config.editorTheme}`)}>
          <div className="VisGraph__toolbar">
            <Toolbar
              actions={actions}
              history={this.history}
              interactionMode={this.state.interactionMode}
              showEditingButtons={writeable}
              logo={config.logo}
              searchText={searchText}
              tableView={tableView}
              {...layoutContext}
            />
          </div>
          <div className={c("VisGraph__content", { 'sidebar-open': showSidebar, 'table-open': tableView })}>
            <div className="VisGraph__main">
              <div className="VisGraph__button-group">
                <ButtonGroup vertical>
                  <Tooltip content={intl.formatMessage(messages.tooltip_fit_selection)}>
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
            </div>
            {showSidebar && (
              <div className="VisGraph__sidebar">
                <Sidebar {...layoutContext} writeable={writeable} searchText={searchText} isOpen={showSidebar} />
              </div>
            )}
            {tableView && (
              <div className="VisGraph__table">
                <TableView
                  isOpen={tableView}
                  toggleTableView={this.toggleTableView}
                  fitToSelection={this.fitToSelection}
                  layout={layout}
                  viewport={viewport}
                  updateLayout={this.updateLayout}
                  writeable={writeable}
                />
              </div>
            )}
          </div>
        </div>
        {writeable && (
          <>
            <VertexCreateDialog
              isOpen={interactionMode === modes.VERTEX_CREATE}
              toggleDialog={this.setInteractionMode}
              vertexCreateOptions={this.state.vertexCreateOptions}
              entityManager={entityManager}
            />

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
            <VertexMenu
              isOpen={vertexMenuSettings !== null && interactionMode !== modes.EDGE_DRAW}
              contents={vertexMenuSettings}
              actions={actions}
              hideMenu={this.hideVertexMenu}
              intl={intl}
            />
            <SettingsDialog
              isOpen={settingsDialogOpen}
              intl={intl}
              settings={layout.settings}
              model={entityManager.model}
              toggleDialog={this.toggleSettingsDialog}
            />
          </>
        )}
      </GraphContext.Provider>
    );
  }
}

export const VisGraph = injectIntl(VisGraphBase);
