import React from 'react'
import { Graph, IGraphEvent } from './Graph'
import { VertexRenderer } from './VertexRenderer'
import { EdgeRenderer } from './EdgeRenderer'
import { ICoordinates, Point } from './Point'

interface ILayoutProps {
  graph: Graph
  center: Point
  zoomFactor: number
}
interface ILayoutState extends IGraphEvent{
  zoomFactor: number
  center: Point
}

export class Layout extends React.PureComponent<ILayoutProps, ILayoutState> {
  static getDerivedStateFromProps(props:ILayoutProps){
    return {
      zoomFactor: props.zoomFactor,
      center: props.center
    }
  }
  state:ILayoutState = {
    vertices: [],
    edges: [],
    zoomFactor:0,
    center: new Point()
  }

  componentDidMount(): void {
    this.props.graph.addEventListener(this.setState, this);
  }

  render() {
    const UNIT = 5
    const RATIO = 1;
    const scale = UNIT * (1+Number(this.state.zoomFactor))
    const height = scale * RATIO
    const width = scale / RATIO
    const { edges, vertices } = this.state;

    const viewportY = -((width / 2) + (UNIT * this.state.center.y));
    const viewportX = -((height / 2)+ (UNIT * this.state.center.x));
    const viewBox = `${viewportX} ${viewportY} ${height} ${width}`

    return (<div style={{fontSize:(scale/(UNIT*10.7))+'px'}}>
      <svg viewBox={viewBox} fill="url(#grid)" style={{
        fontSize:'1em',
        backgroundSize: `${UNIT}% ${UNIT * (Math.pow(RATIO, 2))}%`,
        backgroundImage: 'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)'
      }}>

        <g stroke="green">
          {edges.map(edge => <EdgeRenderer
              key={edge.id}
              viewUnit={UNIT}
              edge={edge}
            />
          )}
        </g>
        <g fill="red">
          {vertices.map(vertex => <VertexRenderer
            key={vertex.id}
            viewUnit={UNIT}
            vertex={vertex}
          />)}
        </g>
      </svg>
    </div>)
  }
  componentWillUnmount(): void {
    this.props.graph.removeEventListener(this.setState)
  }
}
