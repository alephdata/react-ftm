import * as React from 'react'
import { GraphConfig } from '../GraphConfig';
import { Grouping, Rectangle, Vertex } from '../layout'

interface IGroupingRendererProps {
  grouping: Grouping
  config: GraphConfig
  vertices: Vertex[]
}

export class GroupingRenderer extends React.PureComponent<IGroupingRendererProps> {
  getBoundingRect() {
    const { config, vertices } = this.props

    const points = vertices.map((v) => config.gridToPixel(v.position))
    return Rectangle.fromPoints(...points)
  }

  render() {
    const { config, grouping } = this.props

    const {x, y, width, height} = this.getBoundingRect();
    const padding = config.VERTEX_RADIUS*config.gridUnit + 2;

    return (
      <g>
        <rect
          x={x - padding}
          y={y - padding}
          width={width + padding*2}
          height={height + padding*2}
          fill={grouping.color}
          fillOpacity=".1"
        />
        <text
          x={x + width + padding}
          y={y + height + padding}
          fill={grouping.color}
          textAnchor="end"
          fontSize="8"
        >
          {grouping.label}
        </text>
      </g>
    );
  }
}
