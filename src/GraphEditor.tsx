import React from 'react'
// import { Button, ButtonGroup } from "@blueprintjs/core";
import { GraphLayout, GraphUpdateHandler } from './GraphLayout'
import { GraphRenderer } from './GraphRenderer'

export interface IGraphEditorProps {
  layout: GraphLayout,
  updateLayout: GraphUpdateHandler
}

export class GraphEditor extends React.Component<IGraphEditorProps> {
  constructor(props: any) {
    super(props)
  }

  render(){
    const { layout, updateLayout } = this.props;
    return (
      <div style={{borderWidth: 1, borderColor: '#000', borderStyle: 'solid', position: 'relative'}}>
        <div style={{position: 'absolute', top: '2em', right: '2em'}}>
          {' zoom '}
        </div>
        <GraphRenderer layout={layout} updateLayout={updateLayout} />
      </div>
    );
  }
}
