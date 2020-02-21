import * as React from 'react';
import { IconRegistry } from '@alephdata/followthemoney'
import { Colors } from '@blueprintjs/core'
import { Vertex } from "../layout/Vertex";

interface IIconRendererProps {
  vertex:Vertex
}

export class IconRenderer extends React.PureComponent<IIconRendererProps>{
  render(){
    const { vertex, radius } = this.props
    const entity  = vertex.getEntity()
    if(!entity) {
      return null
    }
    
    const translate = `translate(${-radius} ${-radius})`
    const scale = 'scale(0.5)'
    const iconPaths = IconRegistry.getSchemaIcon(entity.schema)
    return iconPaths && (
      <g transform={scale + translate} fill={Colors.WHITE} pointerEvents="none">
        {iconPaths.map((d, i) => <path key={i} d={d}/>)}/>
      </g>
    );
  }
}
