import * as React from 'react'
import c from 'classnames';
import { Vertex } from '../layout'
import { GraphConfig } from '../GraphConfig';

interface IVertexRadiusPickerProps {
  currSelected?: number
  onSelect: (radius: number) => void
  config: GraphConfig
}


export class VertexRadiusPicker extends React.PureComponent<IVertexRadiusPickerProps> {
  constructor(props: IVertexRadiusPickerProps) {
    super(props);

    this.renderOption = this.renderOption.bind(this);
  }

  renderOption(radius: number) {
    const { config, currSelected, onSelect } = this.props
    const style = {
      width: `${radius * config.gridUnit}px`,
    }
    return (
      <div key={radius} className='VertexRadiusPicker__item' onClick={() => onSelect(radius)}>
        <div
          className={c('VertexRadiusPicker__item__swatch', { active: currSelected === radius })}
          style={style}
        />
      </div>
    )
  }

  render() {
    const { defaultRadius } = this.props;
    const radiusOptions = [defaultRadius/2, defaultRadius, defaultRadius*2];
    return (
      <div className='VertexRadiusPicker'>
        {radiusOptions.map(this.renderOption)}
      </div>
    )
  }
}
