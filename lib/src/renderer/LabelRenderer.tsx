import * as React from 'react'
import { Point } from '../layout/Point'

interface ILabelRendererProps {
  label: string,
  center: Point
}

export class LabelRenderer extends React.PureComponent<ILabelRendererProps> {
  render() {
    const { label, center } = this.props;
    const style = {
      fontSize: "5px",
      fontFamily: "sans-serif"
    }
    return (
      <text x={center.x} y={center.y} textAnchor="middle" alignmentBaseline="middle" filter="url(#solid)" style={style}>
        {label}
      </text>
    );
  }
}
