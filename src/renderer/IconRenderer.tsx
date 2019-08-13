import * as React from 'react';
import { Colors } from '@blueprintjs/core'
import { Vertex } from "../layout/Vertex";
import { renderIcon } from '../utils'

interface IIconRendererProps {
  vertex:Vertex
}

export class IconRenderer extends React.PureComponent<IIconRendererProps>{
  render(){
    const { vertex } = this.props
    const entity  = vertex.getEntity()
    if(!entity) {
      return null
    }
    // const radius = IconRegistry.SIZE / 2;
    const radius = 12
    const translate = `translate(${-radius} ${-radius - 2})`
    const scale = 'scale(0.5)'
    const icon = renderIcon(entity.schema);
    return (
      <g transform={scale + translate} fill={Colors.WHITE} pointerEvents="none">
        {icon}
      </g>
    )
  }
}
