import React from 'react';
import {Entity} from "@alephdata/followthemoney";
import {Classes} from '@blueprintjs/core'
/// <reference path="../../types.d.ts"/>
import truncateText from 'truncate';

import { SchemaIcon } from './';




interface IEntityLabel  {
  entity: Entity
  icon?:boolean
  truncate?:number
}

export class EntityLabel extends React.Component<IEntityLabel> {
  render() {
    const {
      entity, icon = false, truncate,
    } = this.props;

    const title = entity.getFirst('title') || entity.getCaption();
    const caption = title.toString();
    const fullLabel = caption;
    const label = truncate ? truncateText(fullLabel, truncate) : fullLabel;
    return (
      <span className={!label ? Classes.TEXT_MUTED : ''} title={caption}>
        {icon && <SchemaIcon schema={entity.schema} />}
        {!label && ('Untitled')}
        {label}
      </span>
    );
  }
}
