import * as React from 'react'
import { Colors } from '@blueprintjs/core';
import { GraphConfig } from '../GraphConfig';
import { Edge, Vertex, Point } from '../layout'


interface IEdgeDrawerProps {
  svgRef: React.RefObject<SVGSVGElement>,
  sourceVertex: Vertex
}

const linkCurveOffset = 20;

export class EdgeDrawer extends React.PureComponent<IEdgeDrawerProps>{
  constructor(props: Readonly<IEdgeDrawerProps>) {
    super(props)
    this.onMouseMove = this.onMouseMove.bind(this)
  }

  componentDidMount() {
    const svg = this.props.svgRef.current;
    if (svg !== null) {
      svg.addEventListener('mousemove', this.onMouseMove)
    }
  }

  componentWillUnmount() {
    const svg = this.props.svgRef.current;
    if (svg !== null) {
      svg.removeEventListener('mousemove', this.onMouseMove)
    }
  }

  onMouseMove(e: MouseEvent) {
    console.log('mouse moving', e)
  }

  render() {
    const {  } = this.props;

    return null

    // return <g className="edge-drawer">
    //   <path
    //     stroke={highlight ? config.SELECTED_COLOR : Colors.GRAY2}
    //     strokeWidth='1'
    //     fill='none'
    //     d={path}
    //     onClick={this.onClick}
    //     style={lineStyles}
    //   />
    // </g>
  }
}
