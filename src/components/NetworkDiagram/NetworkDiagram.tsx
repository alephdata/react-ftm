import * as React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import includes from 'lodash/includes'
import findIndex from 'lodash/findIndex'
import c from 'classnames';
import { Entity, Model } from "@alephdata/followthemoney";
import { Button, ButtonGroup, Tooltip } from '@blueprintjs/core';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';

import { EdgeCreateDialog, EntityCreateDialog } from 'components/common';
import { IEntityContext } from 'contexts/EntityContext';
import { GraphConfig } from 'NetworkDiagram/GraphConfig';
import { GraphRenderer } from 'NetworkDiagram/renderer'
import { Edge, GraphLayout, Rectangle, Point, Settings, Vertex } from 'NetworkDiagram/layout';
import { Viewport } from 'NetworkDiagram/Viewport';
import { GraphContext } from 'NetworkDiagram/GraphContext'
import { Sidebar, TableView, Toolbar, VertexMenu } from 'NetworkDiagram/toolbox';
import { History } from 'NetworkDiagram/History';
import { GroupingCreateDialog, SettingsDialog } from 'NetworkDiagram/dialogs';
import { EdgeType } from 'types';
import { EntityChanges, EntityChangeUpdate } from 'components/common/types';
import { filterVerticesByText, modes } from 'NetworkDiagram/utils'

import './NetworkDiagram.scss';

const messages = defineMessages({
  tooltip_fit_selection: {
    id: 'tooltips.fit_to_selection',
    defaultMessage: 'Fit view to selection',
  },
});

export interface INetworkDiagramProps extends WrappedComponentProps {
  config: GraphConfig,
  entityContext: IEntityContext
  layout: GraphLayout,
  viewport: Viewport,
  updateLayout: (layout:GraphLayout, options?: any) => void,
  updateViewport: (viewport:Viewport) => void
  writeable: boolean
  externalFilterText?: string
  svgRef?: React.RefObject<SVGSVGElement>
}

interface INetworkDiagramState {
  animateTransition: boolean
  interactionMode: string
  searchText: string
  tableView: boolean
  settingsDialogOpen: boolean
  vertexCreateOptions?: any
  vertexMenuSettings: any,
}

class NetworkDiagramBase extends React.Component<INetworkDiagramProps & PropsFromRedux, INetworkDiagramState> {
  state: INetworkDiagramState;
  history: History;

  constructor(props: INetworkDiagramProps & PropsFromRedux) {
    super(props)
    const { externalFilterText, layout, writeable } = props

    this.history = new History();

    if (layout) {
      this.history.push({ layout:layout.toJSON() });
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
    this.onVertexCreate = this.onVertexCreate.bind(this);
    this.onEdgeCreate = this.onEdgeCreate.bind(this);
  }

  componentDidMount() {
    const { externalFilterText } = this.props;

    if (externalFilterText) {
      this.onChangeSearch(externalFilterText);
    }
  }

  componentDidUpdate(prevProps: INetworkDiagramProps) {
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
    this.updateLayout(layout, undefined, { modifyHistory: false })
  }

  onSubmitSearch(event: React.FormEvent) {
    this.fitToSelection();
    event.preventDefault();
    event.stopPropagation();
  }

  updateLayout(layout: GraphLayout, entityChanges?: EntityChanges, options?: any) {
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
    const { config, createEntity, deleteEntity, model, updateEntity } = this.props;

    const { layout, entityChanges } = this.history.go(factor);

    if (entityChanges) {
      const { created, updated, deleted } = entityChanges;

      created && created.forEach((entity: Entity) => factor > 0 ? createEntity(model, entity) : deleteEntity(entity.id));
      updated && updated.forEach(({prev, next}: EntityChangeUpdate) => factor > 0 ? updateEntity(next) : updateEntity(prev));
      deleted && deleted.forEach((entity: Entity) => factor > 0 ? deleteEntity(entity.id) : createEntity(model, entity));
    }

    this.updateLayout(GraphLayout.fromJSON(config, layout), undefined, { forceSaveUpdate: true })
  }

  addVertex(options?: any) {
    this.setState({
      interactionMode: modes.VERTEX_CREATE,
      vertexCreateOptions: options
    })
  }

  async onVertexCreate(entityData: any) {
    const { entities, layout, model, viewport } = this.props;
    const { vertexCreateOptions } = this.state;

    const entity = this.props.createEntity(model, entityData)?.payload;

    if (entity) {
      const center = vertexCreateOptions?.initialPosition || viewport.center;

      layout.layout([...entities.results, entity], center);
      layout.selectByEntityIds([entity.id]);

      const vertex = layout.getVertexByEntity(entity)

      if (vertex) {
        if (vertexCreateOptions?.initialPosition) {
          layout.vertices.set(vertex.id, vertex.snapPosition(center))
        }
        this.updateLayout(layout, { created: [entity] }, { modifyHistory: true, clearSearch: true });
        return entity;
      }
    }
  }

  onEdgeCreate(source: Entity, target: Entity, type: EdgeType) {
    const { createEntity, entities, layout, model, viewport, updateEntity } = this.props;
    const sourceVertex = layout.getVertexByEntity(source);
    const targetVertex = layout.getVertexByEntity(target);
    if (!sourceVertex || !targetVertex) {
      return;
    }

    const entityChanges: EntityChanges = {};
    let edge;
    if (type.property && source) {
      const nextSource = source.clone()
      nextSource.setProperty(type.property, target)
      updateEntity(nextSource);
      const index = findIndex(entities.results, { id: nextSource.id })
      entities.results.splice(index, 1, nextSource);
      layout.layout(entities.results);
      entityChanges.updated = [{ prev: source, next: nextSource }];
      edge = Edge.fromValue(layout, type.property, sourceVertex, targetVertex)
    }
    if (type.schema && type.schema.edge && source && target) {
      const entityData = {
        schema: type.schema,
        properties: {
          [type.schema.edge.source]: source.id,
          [type.schema.edge.target]: target.id,
        }
      };
      const entity = createEntity(model, entityData)?.payload;
      layout.layout([...entities.results, entity]);
      entityChanges.created = [entity];
      edge = Edge.fromEntity(layout, entity, sourceVertex, targetVertex)
    }

    if (edge) {
      layout.selectElement(edge)
      this.updateViewport(viewport.setCenter(edge.getCenter()), {animate:true})
      this.updateLayout(layout, entityChanges, { modifyHistory: true, clearSearch: true });
    }
  }

  showVertexMenu(vertex: Vertex, position: Point, onlyShowExpand = false) {
    const menuSettings = { vertex, position, anchor: 'top', onlyShowExpand };

    const docHeight = document.body.clientHeight;
    if (position.y > docHeight/2) {
      menuSettings.anchor = "bottom";
      menuSettings.position = new Point(position.x, docHeight - position.y);
    }

    this.setState({
      vertexMenuSettings: menuSettings,
    })
  }

  hideVertexMenu() {
    this.setState({ vertexMenuSettings: null });
  }

  setInteractionMode(newMode?: string) {
    this.setState({ interactionMode: newMode || modes.SELECT, vertexCreateOptions: null })
  }

  toggleTableView() {
    this.setState(({ tableView }) => ({ tableView: !tableView }))
  }

  toggleSettingsDialog(settings?: any) {
    const { entities, layout } = this.props;

    this.setState(({ settingsDialogOpen }) => ({ settingsDialogOpen: !settingsDialogOpen }));

    if (settings) {
      layout.settings = Settings.fromJSON(settings);
      layout.layout(entities.results);
      this.updateLayout(layout, undefined, { modifyHistory: true });
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
    const { deleteEntity, entities, layout, resolveEntityReference } = this.props;

    const idsToRemove = layout.removeSelection();
    const entitiesToRemove = idsToRemove
      .map(resolveEntityReference)
      .filter((e: any) => e !== undefined);

    idsToRemove.map(deleteEntity)
    layout.layout(entities.results.filter((e: Entity) => !includes(idsToRemove, e.id)));

    this.updateLayout(layout, { deleted: entitiesToRemove as Array<Entity> }, { modifyHistory:true })
  }

  ungroupSelection() {
    const { layout } = this.props
    layout.ungroupSelection()
    this.updateLayout(layout, undefined, { modifyHistory:true })
  }

  renderVertexMenu() {
    const { entityContext } = this.props;
    const { vertexMenuSettings } = this.state;

    return (
      <VertexMenu
        entityContext={entityContext}
        contents={vertexMenuSettings}
        setInteractionMode={this.setInteractionMode}
        toggleMenu={this.hideVertexMenu}
      />
    );
  }

  renderEdgeCreate() {
    const { entityContext, intl, layout, resolveEntityReference } = this.props;

    const [ sourceId, targetId ] = layout.getSelectedEntityIds();

    return (
      <EdgeCreateDialog
        source={resolveEntityReference(sourceId)}
        target={resolveEntityReference(targetId)}
        isOpen={true}
        toggleDialog={this.setInteractionMode}
        onSubmit={this.onEdgeCreate}
        intl={intl}
        entityContext={entityContext}
      />
    );
  }

  render() {
    const { config, entityContext, intl, layout, model, svgRef, viewport, writeable } = this.props;
    const { animateTransition, interactionMode, searchText, settingsDialogOpen, tableView, vertexMenuSettings } = this.state;

    const layoutContext = {
      layout,
      updateLayout: this.updateLayout,
      viewport,
      updateViewport: this.updateViewport,
      intl,
      writeable,
      interactionMode
    };

    const actions = {
      addVertex: this.addVertex,
      navigateHistory: this.navigateHistory,
      removeSelection: this.removeSelection,
      setInteractionMode: this.setInteractionMode,
      toggleTableView: this.toggleTableView,
      ungroupSelection: this.ungroupSelection,
      onChangeSearch: this.onChangeSearch,
      onSubmitSearch: this.onSubmitSearch,
      showVertexMenu: this.showVertexMenu,
      fitToSelection: this.fitToSelection,
      toggleSettingsDialog: this.toggleSettingsDialog,
    };

    const showSidebar = layout.vertices && layout.vertices.size > 0 && !tableView;

    return (
      <GraphContext.Provider value={layoutContext}>
        <div className={c('NetworkDiagram', `toolbar-${config.toolbarPosition}`, `theme-${config.editorTheme}`)}>
          <div className="NetworkDiagram__toolbar">
            <Toolbar
              actions={actions}
              history={this.history}
              showEditingButtons={writeable}
              searchText={searchText}
              tableView={tableView}
              entityContext={entityContext}
            />
          </div>
          <div className={c("NetworkDiagram__content", { 'sidebar-open': showSidebar, 'table-open': tableView })}>
            <div className="NetworkDiagram__main">
              <div className="NetworkDiagram__button-group">
                <ButtonGroup vertical>
                  <Tooltip content={intl.formatMessage(messages.tooltip_fit_selection)}>
                    <Button icon="zoom-to-fit" onClick={this.fitToSelection}/>
                  </Tooltip>
                  <Button icon="zoom-in" onClick={() => this.onZoom(0.8)}/>
                  <Button icon="zoom-out" onClick={() => this.onZoom(1.2)}/>
                </ButtonGroup>
              </div>
              <GraphRenderer
                entityContext={entityContext}
                svgRef={svgRef}
                animateTransition={animateTransition}
                actions={actions}
              />
            </div>
            {showSidebar && (
              <div className="NetworkDiagram__sidebar">
                <Sidebar
                  entityContext={entityContext}
                  searchText={searchText}
                  isOpen={showSidebar}
                  selectedEntityIds={layout.getSelectedEntityIds()}
                />
              </div>
            )}
            {tableView && (
              <div className="NetworkDiagram__table">
                <TableView
                  entityContext={entityContext}
                  toggleTableView={this.toggleTableView}
                  fitToSelection={this.fitToSelection}
                  key={this.history.getRevertedDistance()}
                />
              </div>
            )}
          </div>
        </div>
        {writeable && (
          <>
            <EntityCreateDialog
              isOpen={interactionMode === modes.VERTEX_CREATE}
              onSubmit={this.onVertexCreate}
              toggleDialog={this.setInteractionMode}
              schema={model.getSchema('Person')}
              entityContext={entityContext}
              intl={intl}
            />
            <GroupingCreateDialog
              isOpen={interactionMode === modes.GROUPING_CREATE}
              toggleDialog={this.setInteractionMode}
            />
            <SettingsDialog
              isOpen={settingsDialogOpen}
              settings={layout.settings}
              toggleDialog={this.toggleSettingsDialog}
              model={model}
            />
            {vertexMenuSettings !== null && interactionMode !== modes.EDGE_DRAW && this.renderVertexMenu()}
            {interactionMode === modes.EDGE_CREATE && this.renderEdgeCreate()}
          </>
        )}
      </GraphContext.Provider>
    );
  }
}

const mapStateToProps = (state: any, ownProps: INetworkDiagramProps) => {
  const { selectModel, selectEntity, selectEntities } = ownProps.entityContext;

  return ({
    model: selectModel(state),
    entities: selectEntities(state),
    resolveEntityReference: (id: any) => selectEntity(state, id)
  });
}

const mapDispatchToProps = (dispatch: any, ownProps: INetworkDiagramProps) => {
  const { createEntity, deleteEntity, updateEntity } = ownProps.entityContext;

  return ({
    createEntity: (model: Model, entityData: any) => dispatch(createEntity(model, entityData)),
    deleteEntity: (entityId: string) => dispatch(deleteEntity(entityId)),
    updateEntity: (entity: Entity) => dispatch(updateEntity(entity)),
  })
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export const NetworkDiagram = connector(
  injectIntl(NetworkDiagramBase)
);
