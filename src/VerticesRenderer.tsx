import React from 'react';
import { Vertex } from './Vertex'
import { VertexRenderer } from './VertexRenderer'
import { Viewport } from './Viewport';

interface VerticesRendererProps{
  vertices: Array<Vertex>
  viewport: Viewport
}

export class VerticesRenderer extends React.PureComponent<VerticesRendererProps>{
  render(){
    const { vertices, viewport } = this.props;
    return  <g fill="red">
      {vertices.map(vertex => <VertexRenderer
        key={vertex.id}
        viewport={viewport}
        vertex={vertex}
      />)}
    </g>
  }
}
