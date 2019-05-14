import React from 'react';
import {Entity} from '@alephdata/followthemoney';
import {Menu, MenuItem, Elevation, Card, Divider, Button, ButtonGroup, Classes} from '@blueprintjs/core'
import {SchemaIcon} from "../SchemaIcon";

interface IEntityListProps {
  entities: Array<Entity>
  onEntitySelected?: (selection: Entity) => void
  leftIcon?: (entity:Entity)=> React.ReactNode
  rightIcon?: (entity:Entity)=> React.ReactNode
}

export class EntityList extends React.PureComponent<IEntityListProps>{
  render(){
    const {entities} = this.props;

    return <Menu >
      {entities.map((entity) => {
        return (<MenuItem
          key={entity.id}
          text={entity.getCaption()}
          icon={SchemaIcon.get(entity.schema)}
          labelElement={ <ButtonGroup vertical>
            <Button icon='locate'/>
            <Button icon='more' />
          </ButtonGroup>}
        />)
      })}
    </Menu>
  }
}
