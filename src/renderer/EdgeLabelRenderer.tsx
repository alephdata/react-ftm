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
  dragSelection: (offset: Point) => any,
  dropSelection: () => any,
  outlineColor?: string,
  textColor?: string
}

interface IEdgeLabelRendererState {
  textExtents: any
}

export class EdgeLabelRenderer extends React.PureComponent<IEdgeLabelRendererProps, IEdgeLabelRendererState> {
  gRef: React.RefObject<SVGGElement>
  text: any

  constructor(props: IEdgeLabelRendererProps){
    super(props);
    this.state = { textExtents:null };
    this.onPanStart = this.onPanStart.bind(this)
    this.onPanMove = this.onPanMove.bind(this)
    this.onPanEnd = this.onPanEnd.bind(this)
    this.gRef = React.createRef()
  }

  componentDidMount() {
    const box = this.text.getBBox();

    this.setState({textExtents:[box.width,box.height]});
  }

  private onPanMove(e: DraggableEvent, data: DraggableData) {
    const { config } = this.props

    const matrix = getRefMatrix(this.gRef)
    const current = applyMatrix(matrix, data.x, data.y)
    const last = applyMatrix(matrix, data.lastX, data.lastY)
    const offset = config.pixelToGrid(current.subtract(last))

    if (offset.x || offset.y) {
      this.props.dragSelection(offset)
    }
  }

  onPanEnd(e: DraggableEvent, data: DraggableData) {
    this.props.dropSelection()
  }

  onPanStart(e: DraggableEvent, data: DraggableData) {
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
        onStart={this.onPanStart}
        onDrag={this.onPanMove}
        onStop={this.onPanEnd} >
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
