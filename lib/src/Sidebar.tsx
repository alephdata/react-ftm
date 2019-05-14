import * as React from 'react'
import {Entity} from '@alephdata/followthemoney';
import {GraphContext, IGraphContext} from './GraphContext'
import {EntityEditor} from "./editor/EntityEditor";
import {EntityList} from "./editor/EntityList";


export class Sidebar extends React.Component<IGraphContext> {
  static contextType = GraphContext;
  context!: React.ContextType<typeof GraphContext>;
  constructor(props: Readonly<IGraphContext>) {
    super(props);
    this.appendToLayout  = this.appendToLayout.bind(this);
  }

  appendToLayout(entity: Entity){
    const { layout } = this.props
    layout.addEntity(entity);
    layout.layout();
    this.props.updateLayout(layout)
  }

  render() {
    if(!this.context) return null;
    const selection = this.context.layout.getSelectedEntities()
    if(selection.length === 1){
      return <EntityEditor
        entity={selection[0]}
        onEntityChanged={this.appendToLayout}
      />
    }else if(selection.length){
      return <EntityList
        entities={selection}
      />
    }
    return "you got nothing here!"
  }
}
