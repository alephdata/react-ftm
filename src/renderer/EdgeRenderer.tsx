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
  svgRef: React.RefObject<SVGSVGElement>,
  selectEdge: (edge: Edge, additional?: boolean) => any,
  dragSelection: (offset: Point, initialPosition?: Point) => any,
  dropSelection: () => any
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

  generatePath(vertex1: any, vertex2: any) {
    const { edge, config } = this.props

    if (edge.labelPosition) {
      const curveGenerator = Bezier.quadraticFromPoints(vertex1, config.gridToPixel(edge.labelPosition), vertex2, .5);
      // location of control point:
      const {x, y} = curveGenerator.points[1]

      return {
        path:"M" + vertex1.x + " " + vertex1.y + " Q " + x + " " + y + " " + vertex2.x + " " + vertex2.y,
        center: edge.labelPosition
      }
    } else {
      // mid-point of line:
      const mpx = (vertex2.x + vertex1.x) * 0.5;
      const mpy = (vertex2.y + vertex1.y) * 0.5;

      return {
        path:"M" + vertex1.x + " " + vertex1.y + " L " + vertex2.x + " " + vertex2.y,
        center: config.pixelToGrid(new Point(mpx, mpy))
      }
    }
  }


  render() {
    const { edge, vertex1, vertex2, config, highlight, dragSelection, dropSelection, svgRef } = this.props;
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
          markerStart={isEntity ? arrowRef : ''}
        />
      </g>
      { highlight && (
        <EdgeLabelRenderer
          config={config}
          svgRef={svgRef}
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
