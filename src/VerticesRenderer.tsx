import React from 'react';
import { Vertex } from './Vertex'
import { VertexRenderer } from './VertexRenderer'

interface VerticesRendererProps{
  vertices: Array<Vertex>
}

export class VerticesRenderer extends React.PureComponent<VerticesRendererProps>{
  render(){
    const { vertices } = this.props;
    return  <g fill="red">
      {vertices.map(vertex => <VertexRenderer
        key={vertex.id}
        viewUnit={5}
        vertex={vertex}
      />)}
    </g>
  }
}
