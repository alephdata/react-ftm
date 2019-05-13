import * as React from 'react'
import {SelectSchema} from './SelectSchema';
import { IGraphContext } from '../GraphContext';
import {Entity, Schema} from '@alephdata/followthemoney';
import {Divider} from '@blueprintjs/core';
import {EntityEditor} from './EntityEditor';

interface ICreateEntityProps extends IGraphContext {
  subsequentOf: Schema
}

interface ICreateEntityState {
  entity?: Entity
}

export class CreateEntity extends React.Component<ICreateEntityProps, ICreateEntityState> {
  constructor(props: ICreateEntityProps) {
    super(props);
    this.onSchemaSelect = this.onSchemaSelect.bind(this);
    this.appendToLayout = this.appendToLayout.bind(this)
  }
  state: ICreateEntityState = {}

  appendToLayout(entity: Entity){
    const { layout } = this.props
    layout.addEntity(entity);
    layout.layout();
    this.props.updateLayout(layout)
  }

  onSchemaSelect(schema: Schema) {
    this.setState(({entity})=>{
      const nextEntity = this.props.layout.model.createEntity(schema);
      // transfer values from old entity to new one where applicable
      if(entity){
        nextEntity.copyProperties(entity)
      }
      return ({ entity: nextEntity })
    })
  }

  render() {
    const {layout, subsequentOf} = this.props;
    const {entity} = this.state;
    return <div>
      <SelectSchema
        disabled={!!entity && !!entity.getProperties().length}
        model={layout.model}
        subsequentOf={subsequentOf}
        onSchemaSelect={this.onSchemaSelect}
      />
      <Divider />
      {entity && <EntityEditor
        onEntityChanged={this.appendToLayout}
        entity={entity}
      /> }
    </div>
  }
}
