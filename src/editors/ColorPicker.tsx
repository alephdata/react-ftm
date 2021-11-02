import * as React from 'react'
import c from 'classnames';
import { Colors } from '@blueprintjs/core';

import './ColorPicker.scss';

const colorOptions = [
  Colors.BLUE1, Colors.GREEN1, Colors.ORANGE1, Colors.RED1, Colors.VIOLET1, Colors.TURQUOISE1
]

interface IColorPickerProps {
  currSelected?: string
  onSelect: (color: string) => void
  swatchShape?: string
}

class ColorPicker extends React.PureComponent<IColorPickerProps> {
  constructor(props: IColorPickerProps) {
    super(props);

    this.renderColor = this.renderColor.bind(this);
  }

  renderColor(color: string | undefined, isCustom: boolean) {
    const { currSelected, onSelect, swatchShape } = this.props
    const style = {
      backgroundColor: color,
      borderColor: color,
    }
    return (
      <div key={color} className='ColorPicker__item' onClick={() => onSelect(color || "green")}>
        <div
          className={c('ColorPicker__item__swatch', swatchShape, { active: currSelected === color })}
          style={style}>
          <div className="ColorPicker__item__swatch__inner" style={style} />
        </div>
      </div>
    )
  }

  render() {
    const { currSelected } = this.props
    const hasCustomColor = !!currSelected && colorOptions.indexOf(currSelected) < 0
    return (
      <div className='ColorPicker'>
        {colorOptions.map((color: string) => this.renderColor(color, false))}
        {this.renderColor(hasCustomColor ? currSelected : undefined, hasCustomColor)}
      </div>
    )
  }
}

export default ColorPicker;
