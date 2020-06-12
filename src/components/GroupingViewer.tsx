import * as React from 'react'
import { defineMessages, WrappedComponentProps } from 'react-intl';
import {Classes, Divider, Icon, H2, UL} from '@blueprintjs/core'
import {Entity, Property} from '@alephdata/followthemoney';
import { ColorPicker, PropertySelect } from '../editors';
import { Vertex, Grouping } from '../layout'
import {EntityList} from "./EntityList";
import c from 'classnames';

import './GroupingViewer.scss';

const messages = defineMessages({
  group: {
    id: 'grouping.label',
    defaultMessage: 'Group',
  },
});

interface IGroupingViewerProps extends WrappedComponentProps {
  grouping: Grouping,
  entites: Array<any>
  onEntitySelected: (entity:Entity) => void
  onEntityRemoved: (grouping: Grouping, entity:Entity) => void
  onColorSelected: (grouping: Grouping, color: string) => void
  writeable: boolean
}

export class GroupingViewer extends React.PureComponent<IGroupingViewerProps> {
  render() {
    const { grouping, intl, onEntitySelected, onEntityRemoved, onColorSelected, writeable } = this.props;
    return (
      <div className='GroupingViewer'>
        <div className='GroupingViewer__title'>
          <div className='GroupingViewer__title__text'>
            <p className='GroupingViewer__title__text__secondary'>
              <Icon icon="group-objects" />
              <span>{intl.formatMessage(messages.group)}</span>
            </p>
            <h2 className='GroupingViewer__title__text__main'>
              {grouping.label}
            </h2>
          </div>
          <div className='GroupingViewer__title__settings'>
            <ColorPicker
              currSelected={grouping.color}
              onSelect={(color: string) => this.props.onColorSelected(grouping, color)}
              swatchShape="square"
            />
          </div>
        </div>
        <EntityList
          entities={grouping.getEntities()}
          onEntitySelected={onEntitySelected}
          onEntityRemoved={writeable ? (entity => onEntityRemoved(grouping, entity)) : undefined}
        />
      </div>
    )
  }
}
