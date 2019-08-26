import * as React from 'react'
import {Entity} from '@alephdata/followthemoney';
import {IGraphContext} from './GraphContext'
import {EntityViewer} from "./editor/EntityViewer";
import {EntityList} from "./editor/EntityList";

import './Sidebar.scss';


export class Sidebar extends React.Component<IGraphContext> {

  constructor(props: Readonly<IGraphContext>) {
    super(props);
    this.appendToLayout  = this.appendToLayout.bind(this);
    this.onEntitySelected = this.onEntitySelected.bind(this);
    this.setEntityColor = this.setEntityColor.bind(this)
  }

  appendToLayout(entity: Entity) {
    const { layout } = this.props
    layout.addEntity(entity);
    this.props.updateLayout(layout, {modifyHistory:true})
  }

  setEntityColor(entity: Entity, color: string) {
    const { layout, updateLayout } = this.props
    const vertex = layout.getVertexByEntity(entity)
    if (vertex) {
      layout.vertices.set(vertex.id, vertex.setColor(color))
      updateLayout(layout, {modifyHistory:true})
    }
  }

  onEntitySelected(entity:Entity){
    const { layout } = this.props;
    const vertexToSelect = layout.getVertexByEntity(entity);
    console.log('in on entityselected', vertexToSelect)
    if(vertexToSelect) {
      layout.selectElement(vertexToSelect)
      this.props.updateLayout(layout)
    }
  }

  render() {
    const { layout } = this.props
    const selection = layout.getSelectedEntities()
    let contents;

    if (selection.length === 1) {
      const entity = selection[0]
      let entityColor
      if (!entity.schema.edge) {
        const vertex = layout.getVertexByEntity(entity)
        if (vertex) {
          entityColor = vertex.color
        }
      }
      contents = <EntityViewer
        entity={entity}
        entityColor={entityColor}
        onEntityChanged={this.appendToLayout}
        onEntityColorSelected={this.setEntityColor}
      />
    } else if (selection.length){
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
