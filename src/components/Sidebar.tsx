import * as React from 'react'
import { defineMessages } from 'react-intl';
import { Entity } from '@alephdata/followthemoney';
import { Drawer } from "@blueprintjs/core";
import { GraphContext } from '../GraphContext'
import { EntityList, EntityViewer, GroupingViewer } from "./";
import { Grouping, Vertex } from '../layout'

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
  searchText: string,
  isOpen: boolean
  selectedEntities: Array<Entity>
}

export class Sidebar extends React.Component<ISidebarProps> {
  static contextType = GraphContext;

  constructor(props: Readonly<ISidebarProps>) {
    super(props);
    this.appendToLayout  = this.appendToLayout.bind(this);
    this.onEntitySelected = this.onEntitySelected.bind(this);
    this.removeGroupingEntity = this.removeGroupingEntity.bind(this);
    this.setVertexColor = this.setVertexColor.bind(this)
    this.setVertexRadius = this.setVertexRadius.bind(this)
    this.setGroupingColor = this.setGroupingColor.bind(this)
  }

  appendToLayout(entity: Entity) {
    const { layout, entityManager, updateLayout } = this.context
    entityManager.updateEntity(entity);
    layout.layout(entityManager.getEntities());
    updateLayout(layout, { updated: [entity] }, { modifyHistory:true });
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
    const { entityManager, intl, layout } = this.context;
    const { isOpen, searchText, selectedEntities } = this.props;
    const selectedGroupings = layout.getSelectedGroupings()
    let contents, searchResultsText;

    if (selectedEntities.length === 1) {
      const entity = selectedEntities[0]
      let vertexRef
      if (!entity.schema.edge) {
        vertexRef = layout.getVertexByEntity(entity)
      }
      contents = <EntityViewer
        entity={entity}
        onEntityChanged={this.appendToLayout}
        vertexRef={vertexRef}
        onVertexColorSelected={this.setVertexColor}
        onVertexRadiusSelected={this.setVertexRadius}
      />
      searchResultsText = intl.formatMessage(messages.search_found_one);
    } else if (!searchText && selectedGroupings.length === 1) {
      const grouping = selectedGroupings[0]
      contents = <GroupingViewer
        grouping={grouping}
        onEntitySelected={this.onEntitySelected}
        onEntityRemoved={this.removeGroupingEntity}
        onColorSelected={this.setGroupingColor}
      />
    } else if (selectedEntities.length) {
      contents = <EntityList entities={selectedEntities} onEntitySelected={this.onEntitySelected} />
      searchResultsText = intl.formatMessage(messages.search_found_multiple, { count: selectedEntities.length });
    } else {
      const entities = entityManager.getEntities()
      contents = <EntityList entities={entities as Entity[]} onEntitySelected={this.onEntitySelected}/>
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
