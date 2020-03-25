import * as React from 'react';
import { IconRegistry } from '@alephdata/followthemoney'
import { Colors } from '@blueprintjs/core'
import { Vertex } from "../layout/Vertex";

interface IIconRendererProps {
  vertex:Vertex
  radius: number
}

export class IconRenderer extends React.PureComponent<IIconRendererProps>{
  render(){
    const { vertex, radius } = this.props
    const entity  = vertex.getEntity()
    if(!entity) {
      return null
    }
    const scaleFactor = radius/20;
    const translate = `translate(${-12} ${-12})`
    const scale = `scale(${scaleFactor})`;
    const iconPaths = IconRegistry.getSchemaIcon(entity.schema)
    return iconPaths && (
      <g transform={scale + translate} fill={Colors.WHITE} pointerEvents="none">
        {iconPaths.map((d, i) => <path key={i} d={d}/>)}/>
      </g>
    );
  }
}
//
// .5 = .3
// 1 = .5
// 1.5 = .8
