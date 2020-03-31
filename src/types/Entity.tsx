import React from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import {Entity} from "@alephdata/followthemoney";
import {Classes} from '@blueprintjs/core'
/// <reference path="../moduleTypes.d.ts"/>
import truncateText from 'truncate';
import { SchemaIcon } from './Schema';
import './Entity.scss'

const messages = defineMessages({
  unknown: {
    id: 'editor.entity.unknown',
    defaultMessage: 'Untitled',
  },
});

interface IEntityLabel extends WrappedComponentProps {
  entity: Entity
  icon?:boolean
  truncate?:number
}

export class EntityLabelBase extends React.Component<IEntityLabel> {
  render() {
    const {
      entity, icon = false, intl, truncate,
    } = this.props;
    if (!entity) return null;

    const title = entity.getFirst('title') || entity.getCaption();
    const caption = title.toString();
    const fullLabel = caption;
    const label = truncate ? truncateText(fullLabel, truncate) : fullLabel;
    return (
      <span className="EntityLabel" title={caption}>
        {icon && <SchemaIcon schema={entity.schema} />}
        <span>{!label && intl.formatMessage(messages.unknown)}</span>
        <span>{label}</span>
      </span>
    );
  }
}

export const EntityLabel = injectIntl(EntityLabelBase);
