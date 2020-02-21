import * as React from 'react'
import c from 'classnames';
import { Vertex } from '../layout'
import { GraphConfig } from '../GraphConfig';
import { Schema } from "@alephdata/followthemoney";
import { SchemaIcon } from '../types';


interface IVertexRadiusPickerProps {
  currSelected?: number
  onSelect: (radius: number) => void
  config: GraphConfig
  schema: Schema
}

import './VertexRadiusPicker.scss'


export class VertexRadiusPicker extends React.PureComponent<IVertexRadiusPickerProps> {
  constructor(props: IVertexRadiusPickerProps) {
    super(props);

    this.renderOption = this.renderOption.bind(this);
  }

  renderOption(radius: number) {
    const { config, currSelected, onSelect, schema } = this.props
    const size = radius * 2 * config.gridUnit;

    return (
      <div key={radius} className='VertexRadiusPicker__item' onClick={() => onSelect(radius)}>
        <SchemaIcon size={size} schema={schema} />
      </div>
    )
  }

  render() {
    const { config } = this.props;
    const defaultRadius = config.DEFAULT_VERTEX_RADIUS;
    const radiusOptions = [defaultRadius/2, defaultRadius, defaultRadius*2];
    return (
      <div className='VertexRadiusPicker'>
        {radiusOptions.map(this.renderOption)}
      </div>
    )
  }
}
