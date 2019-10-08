import * as React from 'react'
import {Classes, Divider, Icon, H2, UL} from '@blueprintjs/core'
import {Entity, Property} from '@alephdata/followthemoney';
import {SelectProperty} from './SelectProperty';
import {PropertyEditor} from './PropertyEditor';
import { PropertyName, PropertyValues} from '../types';
import { SchemaIcon } from '../types';
import { Vertex, Grouping } from '../layout'
import {ColorPicker} from './ColorPicker'
import {EntityList} from "./EntityList";
import c from 'classnames';

import './GroupingViewer.scss';

interface IGroupingViewerProps {
  grouping: Grouping,
  entites: Array<any>
  onEntitySelected: (entity:Entity) => void
  onEntityRemoved: (grouping: Grouping, entity:Entity) => void
  onColorSelected: (grouping: Grouping, color: string) => void
}

export class GroupingViewer extends React.PureComponent<IGroupingViewerProps> {
  render() {
    const { grouping, onEntitySelected, onEntityRemoved, onColorSelected } = this.props;
    return (
      <div
        className='GroupingViewer'
      >
        <div className='GroupingViewer__title'>
          <Icon iconSize={60} icon="group-objects" />
          <h2 className='GroupingViewer__title__text'>{grouping.label}</h2>
          <ColorPicker
            currSelected={grouping.color}
            onSelect={(color: string) => this.props.onColorSelected(grouping, color)} />
        </div>
        <EntityList
          entities={grouping.getEntities()}
          onEntitySelected={onEntitySelected}
          onEntityRemoved={(entity) => onEntityRemoved(grouping, entity)}
        />
      </div>
    )
  }
}
