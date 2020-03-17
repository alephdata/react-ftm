import * as React from 'react'
import c from 'classnames';
import { Slider } from '@blueprintjs/core';
import { Vertex } from '../layout'
import { GraphConfig } from '../GraphConfig';
import { Schema } from "@alephdata/followthemoney";
import { SchemaIcon } from '../types';


interface IVertexRadiusPickerProps {
  currSelected?: number
  onChange: (radius: number) => void
  config: GraphConfig
  schema: Schema
}

import './VertexRadiusPicker.scss'


export class VertexRadiusPicker extends React.PureComponent<IVertexRadiusPickerProps> {
  render() {
    const { config, onChange, radius, schema } = this.props;
    const defaultRadius = config.DEFAULT_VERTEX_RADIUS;
    const radiusRange = [defaultRadius*.5, defaultRadius*1.5];
    return (
      <div className='VertexRadiusPicker'>
        <div className='VertexRadiusPicker__icon'>
          <SchemaIcon
            size={10}
            schema={schema}
          />
        </div>
        <Slider
          value={radius || defaultRadius}
          onChange={(value) => onChange(value)}
          min={radiusRange[0]}
          max={radiusRange[1]}
          showTrackFill={false}
          stepSize={.1}
          labelRenderer={false}
          className='VertexRadiusPicker__slider'
        />
        <div className='VertexRadiusPicker__icon'>
          <SchemaIcon
            size={20}
            schema={schema}
            className='VertexRadiusPicker__icon'
          />
        </div>
      </div>
    )
  }
}
