import React from 'react';
import { Edge } from './Edge'
import { EdgeRenderer } from './EdgeRenderer'

interface EdgesRendererProps{
  edges: Array<Edge>
}

export class EdgesRenderer extends React.PureComponent<EdgesRendererProps>{
  render(){
    const { edges } = this.props;
    return <g stroke="green">
      {edges.map(edge => <EdgeRenderer
          key={edge.id}
          viewUnit={5}
          edge={edge}
        />
      )}
    </g>
  }
}
