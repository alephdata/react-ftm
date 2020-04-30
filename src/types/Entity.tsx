import React from 'react';
import { Entity as FTMEntity} from "@alephdata/followthemoney";
import truncateText from 'truncate';
import c from 'classnames';
import Schema from './Schema';
import './Entity.scss'

interface IEntityLabelProps  {
  entity: FTMEntity
  icon?:boolean
  truncate?:number
}

class EntityLabel extends React.Component<IEntityLabelProps> {
  render() {
    const {
      entity, icon = false, truncate,
    } = this.props;
    if (!entity || !entity.id || !FTMEntity.isEntity(entity)) {
      return null;
    }

    const caption = entity.getCaption();
    const label = truncate ? truncateText(caption, truncate) : caption;
    return (
      <span className={c('EntityLabel', { 'bp3-text-muted': !label })} title={caption}>
        {icon && <Schema.Icon schema={entity.schema} className="left-icon" />}
        <span>{label}</span>
      </span>
    );
  }
}

class Entity extends React.Component {
  static Label = EntityLabel;
}

export default Entity;
