import React from 'react';
import { Entity as FTMEntity} from "@alephdata/followthemoney";
import truncateText from 'truncate';
import c from 'classnames';
import Schema from './Schema';
import Transliterate from './Transliterate';

interface IEntityLabelProps  {
  entity: FTMEntity
  icon?:boolean
  iconSize?: number
  truncate?:number
  translitLookup?: any
}

class EntityLabel extends React.Component<IEntityLabelProps> {
  render() {
    const {
      entity, icon = false, iconSize = 16, truncate, translitLookup
    } = this.props;
    if (!entity || !entity.id || !FTMEntity.isEntity(entity)) {
      return null;
    }

    const caption = entity.getCaption();
    const label = truncate ? truncateText(caption, truncate) : caption;
    return (
      <span className={c('EntityLabel', { 'bp3-text-muted': !label })} title={caption}>
        {icon && <Schema.Icon schema={entity.schema} className="left-icon" size={iconSize} />}
        <span><Transliterate value={label} lookup={translitLookup} /></span>
      </span>
    );
  }
}

class Entity extends React.Component {
  static Label = EntityLabel;
}

export default Entity;
