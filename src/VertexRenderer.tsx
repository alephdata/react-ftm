import React from 'react'
import { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable'
import { Point } from './Point'
import { Vertex } from './Vertex'
import { Viewport } from './Viewport'

interface IVertexRendererProps {
  vertex: Vertex,
  viewport: Viewport,
  updateVertex: (vertex: Vertex) => any
}

let stringToColour = function(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
}

export class VertexRenderer extends React.Component<IVertexRendererProps> {
  panActive: boolean = false

  constructor(props: Readonly<IVertexRendererProps>) {
    super(props)
    this.onPanStart = this.onPanStart.bind(this)
    this.onPanMove = this.onPanMove.bind(this)
    this.onPanEnd = this.onPanEnd.bind(this)
  }

  private onPanMove(e: DraggableEvent, data: DraggableData) {
    const { vertex, viewport } = this.props
    const container = data.node.closest('div.canvas')
    if (this.panActive && container) {
      vertex.point = vertex.point.addition(
        viewport.pixelToGrid(
          new Point(data.deltaX, data.deltaY),
          container.getBoundingClientRect()
        )
      )
      this.props.updateVertex(vertex)
    }
  }

  onPanEnd() {
    this.panActive = false
  }

  onPanStart(e: DraggableEvent) {
    this.panActive = true
    e.stopPropagation()
  }

  render() {
    const { vertex, viewport } = this.props
    const { x, y } = viewport.gridToPixel(vertex.point)
    return <DraggableCore
      enableUserSelectHack={true}
      onStart={this.onPanStart}
      onDrag={this.onPanMove}
      onStop={this.onPanEnd}
    >
      <g
        className="vertex"
        transform={`translate(${x} ${y})`}
        fill={stringToColour(vertex.type)}
      >
        <circle
          r={viewport.gridUnit / 2}
        />
        <text
          className="label"
          fill="black"
        >{vertex.label}</text>
      </g>
    </DraggableCore>
  }
}
