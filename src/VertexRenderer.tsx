import React from 'react'
import { Point } from './Point'
import { Vertex } from './Vertex'
import { Viewport } from './Viewport';

interface IVertexRendererProps {
  vertex: Vertex,
  viewport: Viewport,
  updateVertex: (vertex: Vertex) => any
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
  panActive: boolean = false

  constructor(props: Readonly<IVertexRendererProps>) {
    super(props)
    this.onPanStart = this.onPanStart.bind(this)
    this.onPanMove = this.onPanMove.bind(this)
    this.onPanEnd = this.onPanEnd.bind(this)
  }

  private onPanMove(e: React.MouseEvent<SVGGElement, MouseEvent>) {
    const { vertex, viewport } = this.props
    if (this.panActive && e.currentTarget) {
      e.stopPropagation()
      vertex.point = new Point(
        vertex.point.x + ((e.movementX / viewport.gridUnit)),
        vertex.point.y + ((e.movementY / viewport.gridUnit))
      )
      console.log(vertex.point, e)
      this.props.updateVertex(vertex);
    }
  }

  onPanEnd(e: React.MouseEvent<SVGGElement, MouseEvent>) {
    if (this.panActive) {
      e.stopPropagation()
    }
    this.panActive = false;
  }

  onPanStart(e: React.MouseEvent<SVGGElement, MouseEvent>) {
    this.panActive = true
    console.log("Pan start", this.props.vertex)
    e.stopPropagation()
  }

  render() {
    const { vertex, viewport } = this.props;
    const {x, y} = viewport.gridToPixel(vertex.point);
    return <g
      className="vertex"
      transform={`translate(${x} ${y})`}
      fill={stringToColour(vertex.type)}
      onMouseUp={this.onPanEnd}
      onMouseLeave={this.onPanEnd}
      onMouseDown={this.onPanStart}
      onMouseMove={this.onPanMove}
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
