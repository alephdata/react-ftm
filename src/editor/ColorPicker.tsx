import * as React from 'react'
import { Colors } from '@blueprintjs/core';
import c from 'classnames';

import './ColorPicker.scss';

const colorOptions = [
  'BLUE', 'GREEN', 'ORANGE', 'RED', 'VIOLET', 'TURQUOISE'
]

interface IColorPickerProps {
  entityColor: string
  onSelect: (color: string) => void
}

interface IColorPickerState {
  selectedColor: string
}


export class ColorPicker extends React.PureComponent<IColorPickerProps, IColorPickerState> {
  constructor(props: IColorPickerProps) {
    super(props);

    this.state = {
      selectedColor: props.entityColor
    }

    this.renderColor = this.renderColor.bind(this);
  }

  renderColor(color: string) {
    const { entityColor, onSelect } = this.props
    console.log(entityColor, color, entityColor === color)
    const style = {
      backgroundColor: Colors[`${color}1`],
      border: entityColor === color ? '3px solid white' : '1px solid white'
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
