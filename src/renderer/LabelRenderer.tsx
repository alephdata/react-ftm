import * as React from 'react'
import { Point } from '../layout/Point'

interface ILabelRendererProps {
  label: string,
  center: Point,
  onClick?: (e: any) => void,
  color?: string
}

export class LabelRenderer extends React.PureComponent<ILabelRendererProps> {
  render() {
    const { label, center, onClick, color } = this.props;
    const style = {
      fontSize: "5px",
      fontFamily: "sans-serif",
      fontWeight: "bold"
    } as React.CSSProperties
    return (
      <text x={center.x}
            y={center.y}
            textAnchor="middle"
            alignmentBaseline="middle"
            filter="url(#solid)"
            style={style}
            pointerEvents="none"
            fill={color || 'black'}
            onClick={onClick}>
        {label}
      </text>
    );
  }
}
