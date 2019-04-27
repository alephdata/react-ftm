import React from 'react'
import { Point } from './Point'
import { Vertex } from './Vertex'
import { Viewport } from './Viewport';
import { DraggableCore, DraggableEvent, DraggableData } from 'react-draggable';

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

  private onPanMove(e: DraggableEvent, data: DraggableData) {
    const { vertex, viewport } = this.props
    if (this.panActive) {
      const position = new Point(
        vertex.position.x + ((data.deltaX / viewport.gridUnit) * viewport.zoomLevel),
        vertex.position.y + ((data.deltaY / viewport.gridUnit) * viewport.zoomLevel)
      )
      this.props.updateVertex(vertex.setPosition(position));
    }
  }

  onPanEnd(e: DraggableEvent, data: DraggableData) {
    const { vertex } = this.props
    const position = new Point(
      Math.round(vertex.position.x),
      Math.round(vertex.position.y)
    )
    this.props.updateVertex(vertex.setPosition(position));
    this.panActive = false;
  }

  onPanStart(e: DraggableEvent, data: DraggableData) {
    this.panActive = true
  }

  render() {
    const { vertex, viewport } = this.props;
    const { x, y } = viewport.gridToPixel(vertex.position);
    const translate = `translate(${x} ${y})`
    return (
      <DraggableCore
        handle='.handle'
        onStart={this.onPanStart}
        onDrag={this.onPanMove}
        onStop={this.onPanEnd} >
        <g
          className="vertex"
          transform={translate}
          fill={stringToColour(vertex.type)} >
          <circle className="handle" r={viewport.gridUnit * Vertex.RADIUS} />
          <text
            className="label"
            fill="black"
          >{vertex.label}</text>
        </g>
      </DraggableCore>
    );
  }
}
