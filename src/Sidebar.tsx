import * as React from 'react'
import { defineMessages } from 'react-intl';
import { Entity } from '@alephdata/followthemoney';
import { IGraphContext } from './GraphContext'
import { GroupingViewer } from "./editor/GroupingViewer";
import { EntityViewer } from "./editor/EntityViewer";
import { EntityList } from "./editor/EntityList";
import { Grouping, Vertex } from './layout'
import c from 'classnames';

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

export interface ISidebarProps extends IGraphContext {
  searchText: string,
  writeable: boolean,
}

export class Sidebar extends React.Component<ISidebarProps> {

  constructor(props: Readonly<ISidebarProps>) {
    super(props);
    this.appendToLayout  = this.appendToLayout.bind(this);
    this.onEntitySelected = this.onEntitySelected.bind(this);
    this.removeGroupingEntity = this.removeGroupingEntity.bind(this);
    this.setVertexColor = this.setVertexColor.bind(this)
    this.setGroupingColor = this.setGroupingColor.bind(this)
  }

  appendToLayout(entity: Entity) {
    const { layout } = this.props
    layout.updateEntity(entity);
    this.props.updateLayout(layout, { updated: [entity] }, { modifyHistory:true });
  }

  removeGroupingEntity(grouping: Grouping, entity: Entity) {
    const { layout } = this.props

    const vertex = layout.getVertexByEntity(entity);

    if (vertex) {
      layout.groupings.set(grouping.id, grouping.removeVertex(vertex))
      this.props.updateLayout(layout, null, { modifyHistory:true })
    }
  }

  setVertexColor(vertex: Vertex, color: string) {
    const { layout, updateLayout } = this.props
    if (vertex) {
      layout.vertices.set(vertex.id, vertex.setColor(color))
      updateLayout(layout, null, { modifyHistory: true })
    }
  }

  setGroupingColor(grouping: Grouping, color: string) {
    const { layout, updateLayout } = this.props
    if (grouping) {
      layout.groupings.set(grouping.id, grouping.setColor(color))
      updateLayout(layout, null, { modifyHistory:true });
    }
  }

  onEntitySelected(entity:Entity){
    const { layout } = this.props;
    const vertexToSelect = layout.getVertexByEntity(entity);
    if(vertexToSelect) {
      layout.selectElement(vertexToSelect)
      this.props.updateLayout(layout, null, { clearSearch: true });
    }
  }

  render() {
    const { intl, layout, writeable, searchText } = this.props
    const selection = layout.getSelectedEntities()
    const selectedGroupings = layout.getSelectedGroupings()
    let contents, searchResultsText;

    if (selection.length === 1) {
      const entity = selection[0]
      let vertexRef
      if (!entity.schema.edge) {
        vertexRef = layout.getVertexByEntity(entity)
      }
      contents = <EntityViewer
        entity={entity}
        onEntityChanged={this.appendToLayout}
        vertexRef={vertexRef}
        onVertexColorSelected={this.setVertexColor}
        writeable={writeable}
      />
      searchResultsText = intl.formatMessage(messages.search_found_one);
    } else if (!searchText && selectedGroupings.length === 1) {
      const grouping = selectedGroupings[0]
      contents = <GroupingViewer
        grouping={grouping}
        entites={grouping.getEntities()}
        onEntitySelected={this.onEntitySelected}
        onEntityRemoved={this.removeGroupingEntity}
        onColorSelected={this.setGroupingColor}
        writeable={writeable}
      />
    } else if (selection.length) {
      contents = <EntityList entities={selection} onEntitySelected={this.onEntitySelected} />
      searchResultsText = intl.formatMessage(messages.search_found_multiple, { count: selection.length });
    } else {
      const vertices = layout.getVertices().filter((v) => !v.isHidden())
      const entities = vertices.map((v) => v.getEntity()).filter((e) => !!e)
      contents = <EntityList entities={entities as Entity[]} onEntitySelected={this.onEntitySelected}/>
      searchResultsText = intl.formatMessage(messages.search_found_none);
    }

    return (
      <div className="Sidebar">
        {searchText && (
          <div className="Sidebar__search-text">
            {searchResultsText}
          </div>
        )}
        {contents}
      </div>
    )
  }
}
