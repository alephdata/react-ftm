import * as React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { defineMessages } from 'react-intl';
import { Icon } from '@blueprintjs/core'
import { Entity } from '@alephdata/followthemoney';

import { IEntityContext } from 'contexts';
import { ColorPicker } from 'editors';
import { Grouping } from 'NetworkDiagram/layout'
import { GraphContext } from 'NetworkDiagram/GraphContext'
import { EntityList } from "components/common/EntityList";

import './GroupingViewer.scss';

const messages = defineMessages({
  group: {
    id: 'grouping.label',
    defaultMessage: 'Group',
  },
});

interface IGroupingViewerProps {
  grouping: Grouping
  entityContext: IEntityContext
  onEntitySelected: (entity:Entity) => void
  onEntityRemoved: (grouping: Grouping, entity:Entity) => void
  onColorSelected: (grouping: Grouping, color: string) => void
}

export class GroupingViewerBase extends React.PureComponent<IGroupingViewerProps & PropsFromRedux> {
  static contextType = GraphContext;

  render() {
    const { intl, writeable } = this.context;
    const { entities, grouping, onEntitySelected, onEntityRemoved, onColorSelected } = this.props;
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
              onSelect={(color: string) => onColorSelected(grouping, color)}
              swatchShape="square"
            />
          </div>
        </div>
        <EntityList
          entities={entities}
          onEntitySelected={onEntitySelected}
          onEntityRemoved={writeable ? (entity => onEntityRemoved(grouping, entity)) : undefined}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: IGroupingViewerProps) => {
  const { entityContext, grouping } = ownProps;
  return ({
    entities: grouping.getEntityIds()
      .map((id: string) => entityContext.selectEntity(state, id))
      .filter((e?: Entity) => e !== undefined) as Array<Entity>
  });
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export const GroupingViewer = connector(GroupingViewerBase);
