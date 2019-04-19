import React from 'react'
import { Vertex } from './Vertex'
import { Viewport } from './Viewport';

interface IVertexRendererProps {
  vertex: Vertex,
  viewport: Viewport
}

let stringToColour = function(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

export class VertexRenderer extends React.PureComponent<IVertexRendererProps> {
  render() {
    const { vertex, viewport } = this.props;
    const {x, y} = viewport.gridToPixel(vertex.point);
    return <g
      className="vertex"
      transform={`translate(${x} ${y})`}
      fill={stringToColour(vertex.type)}
    >
      <circle
        r={viewport.gridUnit/2}
      />
      <text
        className="label"
        fill="black"
      >{vertex.label}</text>
    </g>
  }
}
