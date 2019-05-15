import * as React from 'react'
import {Entity} from '@alephdata/followthemoney';
import {IGraphContext} from './GraphContext'
import {EntityViewer} from "./editor/EntityViewer";
import {EntityList} from "./editor/EntityList";


export class Sidebar extends React.Component<IGraphContext> {

  constructor(props: Readonly<IGraphContext>) {
    super(props);
    this.appendToLayout  = this.appendToLayout.bind(this);
  }

  appendToLayout(entity: Entity) {
    const { layout } = this.props
    layout.addEntity(entity);
    layout.layout();
    this.props.updateLayout(layout)
  }

  render() {
    const { layout } = this.props
    const selection = layout.getSelectedEntities()

    if (selection.length === 1) {
      return <EntityViewer
        entity={selection[0]}
        onEntityChanged={this.appendToLayout}
      />
    } else if (selection.length){
      return <EntityList entities={selection} />
    }
    const vertices = layout.getVertices().filter((v) => !v.isHidden())
    const entities = vertices.map((v) => v.getEntity()).filter((e) => !!e)
    return <EntityList entities={entities as Entity[]} />
  }
}
