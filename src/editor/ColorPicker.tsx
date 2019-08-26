import * as React from 'react'
import { Colors } from '@blueprintjs/core';
import { Vertex } from '../layout'

import './ColorPicker.scss';

const colorOptions = [
  'BLUE', 'GREEN', 'ORANGE', 'RED', 'VIOLET', 'TURQUOISE'
]

interface IColorPickerProps {
  vertex: Vertex
  onSelect: (vertex: Vertex, color: string) => void
}


export class ColorPicker extends React.PureComponent<IColorPickerProps> {
  constructor(props: IColorPickerProps) {
    super(props);

    this.renderColor = this.renderColor.bind(this);
  }

  renderColor(color: string) {
    const { vertex, onSelect } = this.props
    const style = {
      backgroundColor: Colors[`${color}1`],
      border: vertex.color === color ? '3px solid white' : '1px solid white'
    }
    return (
      <div key={color} className='ColorPicker__item' onClick={() => onSelect(vertex, color)}>
        <div
          className='ColorPicker__item__swatch'
          style={style}>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='ColorPicker'>
        {colorOptions.map(this.renderColor)}
      </div>
    )
  }
}
