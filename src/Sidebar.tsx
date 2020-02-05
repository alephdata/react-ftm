import * as React from 'react'
import {Entity} from '@alephdata/followthemoney';
import {IGraphContext} from './GraphContext'
import {GroupingViewer} from "./editor/GroupingViewer";
import {EntityViewer} from "./editor/EntityViewer";

import {EntityList} from "./editor/EntityList";
import {Grouping, Vertex} from './layout'

import './Sidebar.scss';

interface ISidebarProps extends IGraphContext {
  searchText: string
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
    const { layout, searchText } = this.props
    const selection = layout.getSelectedEntities()
    const selectedGroupings = layout.getSelectedGroupings()
    let contents, searchResultsText;

    console.log('searchtext is', searchText);

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
      />
      searchResultsText = 'Found 1 result';
    } else if (!searchText && selectedGroupings.length === 1) {
      const grouping = selectedGroupings[0]
      contents = <GroupingViewer
        grouping={grouping}
        entites={grouping.getEntities()}
        onEntitySelected={this.onEntitySelected}
        onEntityRemoved={this.removeGroupingEntity}
        onColorSelected={this.setGroupingColor}
      />
    } else if (selection.length) {
      contents = <EntityList entities={selection} onEntitySelected={this.onEntitySelected} />
      searchResultsText = `Found ${selection.length} results`;
    } else {
      const vertices = layout.getVertices().filter((v) => !v.isHidden())
      const entities = vertices.map((v) => v.getEntity()).filter((e) => !!e)
      contents = <EntityList entities={entities as Entity[]} onEntitySelected={this.onEntitySelected}/>
      searchResultsText = 'No results found';
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
