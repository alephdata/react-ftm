import * as React from 'react'
import { GraphConfig } from '../GraphConfig';
import { Edge, Vertex, Point } from '../layout'
import { EdgeLabelRenderer } from './EdgeLabelRenderer';
import { Colors } from '@blueprintjs/core';


interface IEdgeRendererProps {
  edge: Edge,
  config: GraphConfig,
  vertex1?: Vertex,
  vertex2?: Vertex
  highlight: boolean,
  groupEdgeCount: number,
  selectEdge: (edge: Edge, additional?: boolean) => any,
  offsetIndex: number
}

const linkCurveOffset = 30;

export class EdgeRenderer extends React.PureComponent<IEdgeRendererProps>{
  constructor(props: Readonly<IEdgeRendererProps>) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(e: React.MouseEvent) {
    const { edge, selectEdge } = this.props;
    selectEdge(edge, e.shiftKey)
    e.preventDefault()
    e.stopPropagation()
  }

  calcOffset() {
    const { offsetIndex, groupEdgeCount } = this.props;
    if (groupEdgeCount === 1) {
      return 0
    }
    const groupCountEven = groupEdgeCount % 2 === 0
    const offsetBase = groupCountEven ? 0.5 : 0;
    const offsetMultiplier = groupCountEven ? Math.floor(offsetIndex/2) : Math.ceil(offsetIndex/2)
    const offsetSign = offsetIndex % 2 === 0 ? 1 : -1;
    return offsetSign * ((offsetMultiplier + offsetBase) * linkCurveOffset)
  }

  generatePath(vertex1: any, vertex2: any) {
    // mid-point of line:
    const mpx = (vertex2.x + vertex1.x) * 0.5;
    const mpy = (vertex2.y + vertex1.y) * 0.5;

    // angle perpendicular to line:
    const theta = Math.atan2(vertex2.y - vertex1.y, vertex2.x - vertex1.x) - Math.PI / 2;

    // distance of control point from mid-point of line:
    const offset = this.calcOffset()

    // location of control point:
    const controlXDist = offset * Math.cos(theta)
    const controlYDist = offset * Math.sin(theta)
    const c1x = mpx - controlXDist;
    const c1y = mpy - controlYDist;
    const labelx = mpx - controlXDist/2;
    const labely = mpy - controlYDist/2;

    return {
      path:"M" + vertex1.x + " " + vertex1.y + " Q " + c1x + " " + c1y + " " + vertex2.x + " " + vertex2.y,
      center: new Point(labelx, labely)
    }
  }


  render() {
    const { edge, vertex1, vertex2, config, highlight } = this.props;
    if (!vertex1 || !vertex2 || vertex1.hidden || vertex2.hidden) {
      return null;
    }
    const vertex1Position = config.gridToPixel(vertex1.position)
    const vertex2Position = config.gridToPixel(vertex2.position)
    const lineStyles: React.CSSProperties = {
      cursor: 'pointer'
    }
    const {path, center} = this.generatePath(vertex1Position, vertex2Position)
    return <g className="edge">
      <path
        stroke={highlight ? config.SELECTED_COLOR : Colors.GRAY2}
        strokeWidth='1'
        fill='none'
        d={path}
        onClick={this.onClick}
        style={lineStyles}
      />
      { highlight && (
        <EdgeLabelRenderer center={center} labelText={edge.label} onClick={this.onClick} outlineColor={config.SELECTED_COLOR} textColor={config.VERTEX_COLOR}/>
      )}
    </g>
  }
}
