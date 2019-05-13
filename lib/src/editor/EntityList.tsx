import React from 'react';
import {Entity} from '@alephdata/followthemoney';
import {UL, Elevation, Card, Divider, Button, Classes} from '@blueprintjs/core'

interface IEntityListProps {
  entities: Array<Entity>
  onEntitySelected?: (selection: Entity) => void
  leftIcon?: (entity:Entity)=> React.ReactNode
  rightIcon?: (entity:Entity)=> React.ReactNode
}

export class EntityList extends React.PureComponent<IEntityListProps>{
  render(){
    const {entities} = this.props;

    return <UL className={Classes.LIST_UNSTYLED}>
      {entities.map((entity,i) => {
        return (<>
          <Card elevation={Elevation.TWO}>
            <h5><a href="#">{entity.getCaption()}</a></h5>
            <p>{entity.getProperty('description').join(' ')}</p>
            <Button>Submit</Button>
          </Card>
          {!!(entities.length - 1 - i) && <Divider/>}
        </>)
      })}
    </UL>
  }
}
