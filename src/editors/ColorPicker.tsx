import * as React from 'react'
import c from 'classnames';
import { Colors, Icon } from '@blueprintjs/core';
import { Popover2 as Popover, Tooltip2 as Tooltip } from "@blueprintjs/popover2";
import { HexColorPicker } from "react-colorful";

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
      <div key={color} className='ColorPicker__item' onClick={() => (isCustom || !color) ? null : onSelect(color)}>
        <div
          className={c('ColorPicker__item__swatch', swatchShape, { active: currSelected === color, custom: isCustom })}
          style={style}>
          {color && <div className="ColorPicker__item__swatch__inner" style={style} />}
          {isCustom && (
            <Icon icon="plus" size={14} />
          )}
        </div>
      </div>
    )
  }

  render() {
    const { currSelected, onSelect } = this.props
    const hasCustomColor = !!currSelected && colorOptions.indexOf(currSelected) < 0
    return (
      <div className='ColorPicker'>
        {colorOptions.map((color: string) => this.renderColor(color, false))}
        <Popover
          content={<HexColorPicker color={currSelected} onChange={onSelect} />}
          minimal
        >
          {this.renderColor(hasCustomColor ? currSelected : undefined, true)}
        </Popover>
      </div>
    )
  }
}

export default ColorPicker;
