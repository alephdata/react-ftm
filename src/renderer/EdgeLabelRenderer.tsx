import * as React from 'react'
import { DraggableCore, DraggableEvent, DraggableData } from 'react-draggable';
import { GraphConfig } from '../GraphConfig';
import { Point } from '../layout/Point'
import { Colors } from '@blueprintjs/core';
import { getRefMatrix, applyMatrix } from './utils';

import './EdgeLabelRenderer.scss'

interface IEdgeLabelRendererProps {
  labelText: string,
  config: GraphConfig,
  center: Point,
  onClick: (e: any) => void,
  dragSelection: (offset: Point, gridPosition?: Point) => any,
  dropSelection: () => any,
  outlineColor?: string,
  textColor?: string,
  svgRef: React.RefObject<SVGSVGElement>
}

interface IEdgeLabelRendererState {
  textExtents: any
}

export class EdgeLabelRenderer extends React.PureComponent<IEdgeLabelRendererProps, IEdgeLabelRendererState> {
  gRef: React.RefObject<SVGGElement>
  text: any
  dragInitial: Point

  constructor(props: IEdgeLabelRendererProps){
    super(props);
    this.state = { textExtents:null };
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragMove = this.onDragMove.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.gRef = React.createRef()
    this.dragInitial = new Point(0, 0)
  }

  componentDidMount() {
    const box = this.text.getBBox();

    this.setState({textExtents:[box.width,box.height]});
  }

  private onDragMove(e: DraggableEvent, data: DraggableData) {
    const { config } = this.props

    const matrix = getRefMatrix(this.gRef)
    const current = applyMatrix(matrix, data.x, data.y)
    const last = applyMatrix(matrix, data.lastX, data.lastY)
    const offset = config.pixelToGrid(current.subtract(last))

    if (offset.x || offset.y) {
      this.props.dragSelection(offset, config.pixelToGrid(this.dragInitial))
    }
  }

  onDragEnd(e: DraggableEvent, data: DraggableData) {
    this.dragInitial = new Point(0, 0)
    this.props.dropSelection()
  }

  onDragStart(e: DraggableEvent, data: DraggableData) {
    const { config, svgRef } = this.props
    const matrix = getRefMatrix(svgRef)
    this.dragInitial = applyMatrix(matrix, data.x, data.y)

    this.props.onClick(e)
  }

  render() {
    const { labelText, center, onClick, outlineColor, textColor, config } = this.props;
    const margin = 1.5;
    const extents = this.state.textExtents;
    const { x, y } = config.gridToPixel(center);
    const translate = `translate(${x} ${y})`

    const outline = extents ?
           <rect className="EdgeLabel__outline"
              x={-extents[0]/2-margin}
              y={-extents[1]/2-margin}
              rx={3}
              stroke={outlineColor}
              strokeWidth=".8px"
              width={extents[0]+2*margin}
              height={extents[1]+2*margin}>
            </rect>
         : null;

    return (
      <DraggableCore
        handle='.edge-handle'
        onStart={this.onDragStart}
        onDrag={this.onDragMove}
        onStop={this.onDragEnd} >
        <g
          transform={translate}
          onClick={onClick}
          ref={this.gRef}
          className="EdgeLabel" >
            <g className="edge-handle">
              {outline}
              <text
                ref={(t) => { this.text = t; }}
                textAnchor="middle"
                dy={extents?(extents[1]/4):0}
                className="EdgeLabel__text"
                fill={textColor}>
                {labelText}
              </text>
            </g>
        </g>
      </DraggableCore>

    );
 }
}
