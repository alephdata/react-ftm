import * as React from 'react'
import Bezier from 'bezier-js'
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
  dragSelection: (offset: Point) => any,
  dropSelection: () => any,
  offsetIndex: number,
  direction: string
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
    const { edge, config } = this.props
    let center, c1x, c1y, labelx, labely;

    // mid-point of line:
    const mpx = (vertex2.x + vertex1.x) * 0.5;
    const mpy = (vertex2.y + vertex1.y) * 0.5;

    // angle perpendicular to line:
    const theta = Math.atan2(vertex2.y - vertex1.y, vertex2.x - vertex1.x) - Math.PI / 2;

    // distance of control point from mid-point of line:
    const offset = this.calcOffset()
    const controlXDist = offset * Math.cos(theta)
    const controlYDist = offset * Math.sin(theta)

    console.log()

    // location of control point:
    if (edge.labelPosition) {
      const test = Bezier.quadraticFromPoints(vertex1, config.gridToPixel(edge.labelPosition), vertex2, .5);
      // (1 - t)^2 * P0 + 2 * (1 - t) * t * P1 + t^2 * P2
      console.log(test);
      c1x = test.points[1].x
      c1y = test.points[1].y

      center = edge.labelPosition
    } else {
      c1x = mpx - controlXDist;
      c1y = mpy - controlYDist;
      labelx = mpx - controlXDist/2;
      labely = mpy - controlYDist/2;

      center = config.pixelToGrid(new Point(labelx, labely))
    }

    return {
      path:"M" + vertex1.x + " " + vertex1.y + " Q " + c1x + " " + c1y + " " + vertex2.x + " " + vertex2.y,
      center: center
    }
  }


  render() {
    const { edge, vertex1, vertex2, config, highlight, direction, dragSelection, dropSelection } = this.props;
    if (!vertex1 || !vertex2 || vertex1.hidden || vertex2.hidden) {
      return null;
    }
    const isEntity = edge.isEntity()
    const vertex1Position = config.gridToPixel(vertex1.position)
    const vertex2Position = config.gridToPixel(vertex2.position)
    const {path, center} = this.generatePath(vertex1Position, vertex2Position)

    const clickableLineStyles: React.CSSProperties = {
      cursor: 'pointer'
    }
    const lineStyles: React.CSSProperties = {
      pointerEvents:'none'
    }
    const arrowRef = highlight ?  "url(#arrow)" : "url(#arrow-unselected)"
    return <React.Fragment>
      <g className="edge">
        <path
          stroke="rgba(0,0,0,0)"
          strokeWidth='4'
          fill='none'
          d={path}
          onClick={this.onClick}
          style={clickableLineStyles}
        />
        <path
          stroke={highlight ? config.EDGE_COLOR : config.UNSELECTED_COLOR}
          strokeWidth='1'
          fill='none'
          d={path}
          strokeDasharray={isEntity ? '0' : '1'}
          style={lineStyles}
          markerEnd={isEntity && direction === 'forward' ? arrowRef : ''}
          markerStart={isEntity && direction === 'backward' ? arrowRef : ''}
        />
      </g>
      { highlight && (
        <EdgeLabelRenderer
          config={config}
          center={center}
          labelText={edge.label}
          onClick={this.onClick}
          dragSelection={dragSelection}
          dropSelection={dropSelection}
          outlineColor={config.EDGE_COLOR}
          textColor={config.EDGE_COLOR}/>
      )}
    </React.Fragment>
  }
}
