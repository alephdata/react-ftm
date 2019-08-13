import React from 'react';
import { Entity } from '@alephdata/followthemoney';
import { Menu, MenuItem } from '@blueprintjs/core'
import { SchemaIcon } from '../types';
import './EntityList.scss';


interface IEntityListProps {
  entities: Array<Entity>
  onEntitySelected?: (selection: Entity) => void
}

export class EntityList extends React.PureComponent<IEntityListProps>{
  onClickFactory = (entity:Entity) =>
    () => this.props.onEntitySelected && this.props.onEntitySelected(entity)
  render(){
    const {entities} = this.props;
    return <Menu className="EntityList">
      {entities.map((entity) =>
        <MenuItem
          className="EntityList__item"
          onClick={this.onClickFactory(entity)}
          key={entity.id}
          text={entity.getCaption()}
          icon={SchemaIcon.get(entity.schema)}
        />
      )}
    </Menu>
  }
}
