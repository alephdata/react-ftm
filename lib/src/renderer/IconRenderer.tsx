import * as React from 'react';
import {IconRegistry} from '@alephdata/followthemoney'
import {Colors} from '@blueprintjs/core'
import {Vertex} from "..";

interface IIconRendererProps {
  vertex:Vertex
}

export class IconRenderer extends React.PureComponent<IIconRendererProps>{
  render(){
    const {vertex} = this.props;

    let icon = null;
    const entity  = vertex.layout.entities.get(vertex.entityId as string)
    if(entity){
      // radius = size of the icon / 2;; 24 / 2 = 12
      const radius = 12;
      const translate = `translate(${-radius} ${-radius - 2})`;
      const scale = 'scale(0.5)';

      const iconPaths = IconRegistry.getIcon(entity.schema.name.toLowerCase());
      icon = iconPaths && (<g transform={scale + translate} fill={Colors.BLUE1} className="vertex--icon">{iconPaths
        .map((d, i) => <path key={i} d={d}/>)
      }/></g>);
    }
    return icon
  }
}
