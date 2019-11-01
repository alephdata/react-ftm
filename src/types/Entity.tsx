import React from 'react';
import {Entity} from "@alephdata/followthemoney";
import {Classes} from '@blueprintjs/core'
/// <reference path="../moduleTypes.d.ts"/>
import truncateText from 'truncate';
import { SchemaIcon } from './Schema';
import './Entity.scss'


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
      <span className="EntityLabel" title={caption}>
        {icon && <SchemaIcon schema={entity.schema} />}
        {!label && ('Untitled')}
        {label}
      </span>
    );
  }
}
