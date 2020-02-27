import * as React from 'react'
import c from 'classnames';
import { Button, ButtonGroup, Classes, Position, Tooltip } from '@blueprintjs/core';
import Translator from './Translator';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { EntityManager } from './EntityManager';
import { GraphConfig } from './GraphConfig';
import { GraphRenderer } from './renderer/GraphRenderer'
import { GraphLayout, Rectangle, Point } from './layout';
import { Viewport } from './Viewport';
import { IGraphContext, GraphContext } from './GraphContext'
import { Toolbar } from './Toolbar';
import { Sidebar } from './Sidebar';
import { History } from './History';
import { EdgeCreateDialog, GroupingCreateDialog, VertexCreateDialog } from "./dialogs";
import { TableEditor } from "./editor";

import { modes } from './interactionModes'
import { filterVerticesByText } from './filters';

import './VisGraph.scss';

const messages = defineMessages({
  tooltip_fit_selection: {
    id: 'tooltips.fit_to_selection',
    defaultMessage: 'Fit view to selection',
  },
});

export interface IVisGraphProps {
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

interface IVisGraphControllerProps extends IVisGraphProps, WrappedComponentProps {}

interface IVisGraphState {
  animateTransition: boolean
  interactionMode: string
  searchText: string
  tableView: boolean
  vertexCreateOptions?: any
}

class VisGraphController extends React.Component<IVisGraphControllerProps, IVisGraphState> {
  state: IVisGraphState;
  history: History;
  svgRef: React.RefObject<SVGSVGElement>

  constructor(props: IVisGraphControllerProps) {
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
  }

  componentDidMount() {
    const { externalFilterText } = this.props;

    if (externalFilterText) {
      this.onChangeSearch(externalFilterText);
    }
  }

  componentDidUpdate(prevProps: IVisGraphControllerProps) {
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

  setInteractionMode(newMode?: string) {
    this.setState({ interactionMode: newMode || modes.SELECT, vertexCreateOptions: null })
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
    const { config, intl, layout, locale, viewport, writeable } = this.props;
    const { animateTransition, interactionMode, searchText, tableView } = this.state;
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
    };

    const showSidebar = layout.vertices && layout.vertices.size > 0;

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
              {...layoutContext}
            />
          </div>
          <div className="VisGraph__content">
            <div className="VisGraph__content__inner-container">
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
              <TableEditor
                isOpen={tableView}
                layout={layout}
                updateLayout={this.updateLayout}
                writeable={writeable}
                actions={actions}
              />
            </div>
            {showSidebar &&
              <div className="VisGraph__sidebar">
                <Sidebar {...layoutContext} writeable={writeable} searchText={searchText} />
              </div>
            }
          </div>
        </div>
        {writeable && (
          <>
            <VertexCreateDialog
              isOpen={interactionMode === modes.VERTEX_CREATE}
              toggleDialog={this.setInteractionMode}
              vertexCreateOptions={this.state.vertexCreateOptions} />

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

const VisGraphControllerIntl = injectIntl(VisGraphController);

export const VisGraph = ({ locale, ...rest}: IVisGraphProps ) => (
  <Translator locale={locale}>
    <VisGraphControllerIntl {...rest} />
  </Translator>
);
