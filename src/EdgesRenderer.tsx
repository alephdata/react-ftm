import React from 'react';
import { Edge } from './Edge'
import { EdgeRenderer } from './EdgeRenderer'
import { Viewport } from './Viewport';

interface EdgesRendererProps{
  edges: Array<Edge>
  viewport: Viewport
}

export class EdgesRenderer extends React.PureComponent<EdgesRendererProps>{
  render(){
    const { edges, viewport } = this.props;
    return <g stroke="green">
      {edges.map(edge => <EdgeRenderer
          key={edge.id}
          viewport={viewport}
          edge={edge}
        />
      )}
    </g>
  }
}
