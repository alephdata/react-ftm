import * as React from 'react'
import { Point } from '../layout/Point'
import { Colors } from '@blueprintjs/core';

import './EdgeLabelRenderer.scss'

interface IEdgeLabelRendererProps {
  labelText: string,
  center: Point,
  onClick?: (e: any) => void,
  outlineColor?: string,
  textColor?: string
}

interface IEdgeLabelRendererState {
  textExtents: any
}

export class EdgeLabelRenderer extends React.PureComponent<IEdgeLabelRendererProps, IEdgeLabelRendererState> {
  text: any

  constructor(props: IEdgeLabelRendererProps){
    super(props);
    this.state = { textExtents:null };
  }

  componentDidMount() {
    const box = this.text.getBBox();

    this.setState({textExtents:[box.width,box.height]});
  }

  render() {
    const { labelText, center, onClick, outlineColor, textColor } = this.props;
    const margin = 1.5;
    const extents = this.state.textExtents;
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

    return <g
      transform={`translate(${center.x},${center.y})`}
      onClick={onClick}
      className="EdgeLabel" >
        {outline}
        <text
          ref={(t) => { this.text = t; }}
          textAnchor="middle"
          dy={extents?(extents[1]/4):0}
          className="EdgeLabel__text"
          fill={textColor}>
          {labelText}
        </text>
      </g>;
 }
}
