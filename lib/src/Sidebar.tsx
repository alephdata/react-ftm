import * as React from 'react'
import {Entity} from '@alephdata/followthemoney';
import {GraphContext, IGraphContext} from './GraphContext'
import {EntityEditor} from "./editor/EntityEditor";


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
    if(!this.context)return null;
    return <EntityEditor
      entity={this.context.layout.entities.values().next().value}
      onEntityChanged={this.appendToLayout}
    />
  }
}
