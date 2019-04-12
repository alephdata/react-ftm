import React from 'react'
import { Vertex } from './Vertex'

interface IVertexRendererProps {
  vertex: Vertex,
  viewUnit: number
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
    const { vertex, viewUnit } = this.props;
    const {x, y} = vertex.point;
    return <g
      className="vertex"
      transform={`translate(${x * viewUnit} ${y * viewUnit})`}
      fill={stringToColour(vertex.type)}
    >
      <circle
        r={viewUnit/2}
      />
      <text
        className="label"
        fill="black"
      >{vertex.type + vertex.label}</text>
    </g>
  }
}
