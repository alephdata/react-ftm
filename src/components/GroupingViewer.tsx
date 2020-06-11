import * as React from 'react'
import {Classes, Divider, Icon, H2, UL} from '@blueprintjs/core'
import {Entity, Property} from '@alephdata/followthemoney';
import { ColorPicker, PropertySelect } from '../editors';
import { Vertex, Grouping } from '../layout'
import {EntityList} from "./EntityList";
import c from 'classnames';

import './GroupingViewer.scss';

interface IGroupingViewerProps {
  grouping: Grouping,
  entites: Array<any>
  onEntitySelected: (entity:Entity) => void
  onEntityRemoved: (grouping: Grouping, entity:Entity) => void
  onColorSelected: (grouping: Grouping, color: string) => void
  writeable: boolean
}

export class GroupingViewer extends React.PureComponent<IGroupingViewerProps> {
  render() {
    const { grouping, onEntitySelected, onEntityRemoved, onColorSelected, writeable } = this.props;
    return (
      <div className='GroupingViewer'>
        <div className='GroupingViewer__title'>
          <div className='GroupingViewer__title__text'>
            <p className='GroupingViewer__title__text__secondary'>
              <Icon icon="group-objects" />
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
