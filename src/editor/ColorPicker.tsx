import * as React from 'react'
import { Colors } from '@blueprintjs/core';
import { Vertex } from '../layout'

import './ColorPicker.scss';

const colorOptions = [
  Colors.BLUE1, Colors.GREEN1, Colors.ORANGE1, Colors.RED1, Colors.VIOLET1, Colors.TURQUOISE1
]

interface IColorPickerProps {
  currSelected?: string
  onSelect: (color: string) => void
}


export class ColorPicker extends React.PureComponent<IColorPickerProps> {
  constructor(props: IColorPickerProps) {
    super(props);

    this.renderColor = this.renderColor.bind(this);
  }

  renderColor(color: string) {
    const { currSelected, onSelect } = this.props
    const style = {
      backgroundColor: color,
      border: currSelected === color ? '3px solid white' : '1px solid white'
    }
    return (
      <div key={color} className='ColorPicker__item' onClick={() => onSelect(color)}>
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
