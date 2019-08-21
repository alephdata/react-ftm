import React from 'react';
import { Entity } from '@alephdata/followthemoney';
import { Menu, MenuItem } from '@blueprintjs/core'
import { SchemaIcon } from '../types';
import { groupBy } from '../utils'
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
    const entityGroups = groupBy(entities, (e:Entity) => e.schema.plural)
    return <Menu className="EntityList">
      {Object.entries(entityGroups).map(([key, values]:any) => {
        return (
          <div className="EntityList__category" key={key}>
            <h5 className="EntityList__category__title">{key}</h5>
            <div className="EntityList__category__values">
              {values.map((entity: Entity ) =>
                <MenuItem
                  className="EntityList__item"
                  onClick={this.onClickFactory(entity)}
                  key={entity.id}
                  text={entity.getCaption()}
                  icon={SchemaIcon.get(entity.schema)}
                />
              )}
            </div>
          </div>
        )
      })}
    </Menu>
  }
}
