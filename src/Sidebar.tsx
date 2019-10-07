import * as React from 'react'
import {Entity} from '@alephdata/followthemoney';
import {IGraphContext} from './GraphContext'
import {GroupingViewer} from "./editor/GroupingViewer";
import {EntityViewer} from "./editor/EntityViewer";

import {EntityList} from "./editor/EntityList";
import {Grouping, Vertex} from './layout'

import './Sidebar.scss';


export class Sidebar extends React.Component<IGraphContext> {

  constructor(props: Readonly<IGraphContext>) {
    super(props);
    this.appendToLayout  = this.appendToLayout.bind(this);
    this.onEntitySelected = this.onEntitySelected.bind(this);
    this.setVertexColor = this.setVertexColor.bind(this)
    this.setGroupingColor = this.setGroupingColor.bind(this)

  }

  appendToLayout(entity: Entity) {
    const { layout } = this.props
    layout.addEntity(entity);
    this.props.updateLayout(layout, {modifyHistory:true})
  }

  setVertexColor(vertex: Vertex, color: string) {
    const { layout, updateLayout } = this.props
    if (vertex) {
      layout.vertices.set(vertex.id, vertex.setColor(color))
      updateLayout(layout, {modifyHistory:true})
    }
  }

  setGroupingColor(grouping: Grouping, color: string) {
    const { layout, updateLayout } = this.props
    if (grouping) {
      layout.groupings.set(grouping.id, grouping.setColor(color))
      updateLayout(layout, {modifyHistory:true})
    }
  }

  onEntitySelected(entity:Entity){
    const { layout } = this.props;
    const vertexToSelect = layout.getVertexByEntity(entity);
    if(vertexToSelect) {
      layout.selectElement(vertexToSelect)
      this.props.updateLayout(layout)
    }
  }

  render() {
    const { layout } = this.props
    const selection = layout.getSelectedEntities()
    const selectedGroupings = layout.getSelectedGroupings()
    let contents;

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
    } else if (selectedGroupings.length === 1) {
      const grouping = selectedGroupings[0]
      contents = <GroupingViewer
        grouping={grouping}
        entites={grouping.getEntities()}
        onColorSelected={this.setGroupingColor}
      />
    } else if (selection.length) {
      contents = <EntityList entities={selection} onEntitySelected={this.onEntitySelected} />
    } else {
      const vertices = layout.getVertices().filter((v) => !v.isHidden())
      const entities = vertices.map((v) => v.getEntity()).filter((e) => !!e)
      contents = <EntityList entities={entities as Entity[]} onEntitySelected={this.onEntitySelected}/>
    }

    return (
      <div className="Sidebar">
        {contents}
      </div>
    )
  }
}
