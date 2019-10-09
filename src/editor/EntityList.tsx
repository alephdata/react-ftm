import React from 'react';
import { Entity } from '@alephdata/followthemoney';
import { Button, Menu, MenuItem, Icon } from '@blueprintjs/core'
import { SchemaIcon } from '../types';
import { groupBy } from '../utils'
import './EntityList.scss';


interface IEntityListProps {
  entities: Array<Entity>
  onEntitySelected?: (selection: Entity) => void
  onEntityRemoved?: (selection: Entity) => void
}

export class EntityList extends React.PureComponent<IEntityListProps>{
  constructor(props: IEntityListProps) {
    super(props)

    this.renderItem = this.renderItem.bind(this)
  }

  renderItem(entity:Entity) {
    const { onEntityRemoved, onEntitySelected } = this.props;

    return (
      <li className="EntityList__item" key={entity.id}>
        <div
          className="EntityList__item__left bp3-menu-item"
          onClick={() => onEntitySelected && onEntitySelected(entity)}
        >
            <Icon icon={SchemaIcon.get(entity.schema)} />
            <div className="bp3-fill">
              {entity.getCaption()}
            </div>
        </div>
        {onEntityRemoved && (
          <div
            className="EntityList__item__right"
            onClick={() => onEntityRemoved(entity)}
          >
            <Icon icon="cross" />
          </div>
        )}
      </li>
    )
  }

  render() {
    const { entities } = this.props;
    const entityGroups = groupBy(entities, (e:Entity) => e.schema.plural)
    return <Menu className="EntityList">
      {Object.entries(entityGroups).map(([key, values]:any) => {
        return (
          <div className="EntityList__category" key={key}>
            <h5 className="EntityList__category__title">{key}</h5>
            <div className="EntityList__category__values">
              {values.map(this.renderItem)}
            </div>
          </div>
        )
      })}
    </Menu>
  }
}
