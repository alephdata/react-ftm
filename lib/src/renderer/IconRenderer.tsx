import * as React from 'react';
import { IconRegistry } from '@alephdata/followthemoney'
import { Colors } from '@blueprintjs/core'
import { Vertex } from "../layout/Vertex";

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
    const translate = `translate(${-radius} ${-radius - 2})`;
    const scale = 'scale(0.5)';

    const iconPaths = IconRegistry.getSchemaIcon(entity.schema);
    return iconPaths && (<g transform={scale + translate} fill={Colors.WHITE} className="vertex--icon">{iconPaths
      .map((d, i) => <path key={i} d={d}/>)
    }/></g>);
  }
}
