import * as React from 'react'
import { defineMessages } from 'react-intl';
import { compose } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { Entity } from '@alephdata/followthemoney';
import { Drawer } from "@blueprintjs/core";

import { IEntityContext } from 'contexts/EntityContext';
import { GraphContext } from 'NetworkDiagram/GraphContext'
import { EntityList } from 'components/common';
import { EntityViewer, GroupingViewer } from 'components/NetworkDiagram/toolbox';
import { Grouping, Vertex } from 'components/NetworkDiagram/layout'

import './Sidebar.scss';

const messages = defineMessages({
  search_found_one: {
    id: 'search.results_text.one',
    defaultMessage: 'Found 1 result',
  },
  search_found_multiple: {
    id: 'search.results_text.multiple',
    defaultMessage: 'Found {count} results',
  },
  search_found_none: {
    id: 'search.results_text.none',
    defaultMessage: 'No results found',
  },
});

export interface ISidebarProps {
  entityContext: IEntityContext
  searchText: string,
  isOpen: boolean
  selectedEntityIds: Array<string>
}

export class SidebarBase extends React.Component<ISidebarProps & PropsFromRedux> {
  static contextType = GraphContext;

  constructor(props: Readonly<ISidebarProps & PropsFromRedux>) {
    super(props);
    this.onEntityChanged  = this.onEntityChanged.bind(this);
    this.onEntitySelected = this.onEntitySelected.bind(this);
    this.removeGroupingEntity = this.removeGroupingEntity.bind(this);
    this.setVertexColor = this.setVertexColor.bind(this)
    this.setVertexRadius = this.setVertexRadius.bind(this)
    this.setGroupingColor = this.setGroupingColor.bind(this)
  }

  onEntityChanged(entity: Entity) {
    const { layout, entityManager, updateLayout } = this.context;
    const previousEntity = entityManager.getEntity(entity.id);
    entityManager.updateEntity(entity);
    layout.layout(entityManager.getEntities());
    updateLayout(layout, { updated: [{ prev: previousEntity, next: entity }] }, { modifyHistory:true });
  }

  removeGroupingEntity(grouping: Grouping, entity: Entity) {
    const { layout, updateLayout } = this.context

    const vertex = layout.getVertexByEntity(entity);

    if (vertex) {
      layout.groupings.set(grouping.id, grouping.removeVertex(vertex))
      updateLayout(layout, null, { modifyHistory:true })
    }
  }

  setVertexColor(vertex: Vertex, color: string) {
    const { layout, updateLayout } = this.context
    if (vertex) {
      layout.vertices.set(vertex.id, vertex.setColor(color))
      updateLayout(layout, null, { modifyHistory: true })
    }
  }

  setVertexRadius(vertex: Vertex, radius: number) {
    const { layout, updateLayout } = this.context
    if (vertex) {
      layout.vertices.set(vertex.id, vertex.setRadius(radius))
      updateLayout(layout, null, { modifyHistory: true })
    }
  }

  setGroupingColor(grouping: Grouping, color: string) {
    const { layout, updateLayout } = this.context
    if (grouping) {
      layout.groupings.set(grouping.id, grouping.setColor(color))
      updateLayout(layout, null, { modifyHistory:true });
    }
  }

  onEntitySelected(entity:Entity){
    const { layout, updateLayout } = this.context
    const vertexToSelect = layout.getVertexByEntity(entity);
    if(vertexToSelect) {
      layout.selectElement(vertexToSelect)
      updateLayout(layout, null, { clearSearch: true });
    }
  }

  render() {
    const { entityContext, intl, layout } = this.context;
    const { entities, isOpen, searchText, selectedEntities } = this.props;
    const selectedGroupings = layout.getSelectedGroupings()
    let contents, searchResultsText;

    if (selectedEntities.length === 1) {
      const entity = selectedEntities[0];
      let vertexRef
      if (!entity.schema.edge) {
        vertexRef = layout.getVertexByEntity(entity)
      }
      contents = <EntityViewer
        entity={entity}
        onEntityChanged={this.onEntityChanged}
        vertexRef={vertexRef}
        onVertexColorSelected={this.setVertexColor}
        onVertexRadiusSelected={this.setVertexRadius}
      />
      searchResultsText = intl.formatMessage(messages.search_found_one);
    } else if (!searchText && selectedGroupings.length === 1) {
      const grouping = selectedGroupings[0]
      contents = <GroupingViewer
        grouping={grouping}
        entityContext={entityContext}
        onEntitySelected={this.onEntitySelected}
        onEntityRemoved={this.removeGroupingEntity}
        onColorSelected={this.setGroupingColor}
      />
    } else if (selectedEntities.length) {
      contents = <EntityList entities={selectedEntities} onEntitySelected={this.onEntitySelected} />
      searchResultsText = intl.formatMessage(messages.search_found_multiple, { count: selectedEntities.length });
    } else {
      contents = <EntityList entities={entities} onEntitySelected={this.onEntitySelected}/>
      searchResultsText = intl.formatMessage(messages.search_found_none);
    }

    return (
      <Drawer
        className="Sidebar"
        isOpen={isOpen}
        hasBackdrop={false}
        autoFocus={false}
        enforceFocus={false}
        usePortal={false}
      >
        {searchText && (
          <div className="Sidebar__search-text">
            {searchResultsText}
          </div>
        )}
        {contents}
      </Drawer>
    )
  }
}


const mapStateToProps = (state: any, ownProps: ISidebarProps) => {
  const { entityContext, selectedEntityIds } = ownProps;
  return ({
    entities: entityContext.selectEntities(state),
    selectedEntities: entityContext.selectEntities(state, selectedEntityIds)
  });
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export const Sidebar = connector(SidebarBase);
