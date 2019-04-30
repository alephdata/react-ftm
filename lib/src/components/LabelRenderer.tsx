import * as React from 'react'
import { Point } from '../Point'

interface ILabelRendererProps {
  label: string,
  center: Point
}

export class LabelRenderer extends React.PureComponent<ILabelRendererProps> {
  render() {
    const { label, center } = this.props;
    const style = {
      fontSize: "5px",
      fontFamily: "sans-serif",
    }
    return (
      <React.Fragment>
        <text x={center.x} y={center.y} textAnchor="middle" alignmentBaseline="middle" filter="url(#solid)" style={style}>
          {label}
        </text>
        <text x={center.x} y={center.y} textAnchor="middle" alignmentBaseline="middle" style={style}>
          {label}
        </text>
      </React.Fragment>
    )
  }
}
