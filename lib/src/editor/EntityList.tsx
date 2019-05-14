import React from 'react';
import { Entity } from '@alephdata/followthemoney';
import { Menu, MenuItem } from '@blueprintjs/core'
import { SchemaIcon } from "../SchemaIcon";

interface IEntityListProps {
  entities: Array<Entity>
  onEntitySelected?: (selection: Entity) => void
}

export class EntityList extends React.PureComponent<IEntityListProps>{
  render(){
    const {entities} = this.props;
    return <Menu>
      {entities.map((entity) =>
        <MenuItem
          key={entity.id}
          text={entity.getCaption()}
          icon={SchemaIcon.get(entity.schema)}
        />
      )}
    </Menu>
  }
}
