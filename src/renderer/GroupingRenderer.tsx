import * as React from 'react'
import { GraphConfig } from '../GraphConfig';
import { GraphElement, Grouping, Rectangle, Vertex } from '../layout'

interface IGroupingRendererProps {
  grouping: Grouping
  config: GraphConfig
  vertices: Vertex[]
  selected: boolean
  selectGrouping: (element: Array<GraphElement>, additional?: boolean) => any
}

export class GroupingRenderer extends React.PureComponent<IGroupingRendererProps> {
  onClick() {
    const { grouping, vertices } = this.props
    console.log('clicked grouping');
    this.props.selectGrouping(vertices, true);
  }

  getBoundingRect() {
    const { config, vertices } = this.props

    const points = vertices.map((v) => config.gridToPixel(v.position))
    return Rectangle.fromPoints(...points)
  }

  render() {
    const { config, grouping, selected } = this.props

    const {x, y, width, height} = this.getBoundingRect();
    const padding = config.VERTEX_RADIUS*config.gridUnit + 8;

    return (
      <g onClick={this.onClick}>
        <rect
          x={x - padding}
          y={y - padding}
          rx="5"
          width={width + padding*2}
          height={height + padding*2}
          fill={selected ? grouping.color : config.UNSELECTED_COLOR}
          fillOpacity={selected ? ".1" : ".2"}
        />
        <text
          x={x + width + padding - 5}
          y={y + height + padding - 5}
          fill={selected ? grouping.color : config.UNSELECTED_COLOR}
          textAnchor="end"
          fontSize="8"
        >
          {grouping.label}
        </text>
      </g>
    );
  }
}
