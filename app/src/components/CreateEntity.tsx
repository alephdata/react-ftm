import React, {PureComponent} from 'react';
import {SelectSchema} from "./ftm/SelectSchema";
import {GraphLayout, GraphUpdateHandler} from "@alephdata/vislib";
import {Entity, Schema} from "@alephdata/followthemoney";
import {Divider} from "@blueprintjs/core";
import EntityEditor from "./ftm/EntityEditor";

interface ICreateEntityProps {
  layout: GraphLayout
  subsequentOf: Schema
  updateLayout:GraphUpdateHandler
}

interface ICreateEntityState {
  entity?: Entity
}

export class CreateEntity extends PureComponent<ICreateEntityProps, ICreateEntityState> {
  constructor(props: ICreateEntityProps) {
    super(props);
    this.onSchemaSelect = this.onSchemaSelect.bind(this);
  }
  state:ICreateEntityState = {}

  onSchemaSelect(schema:Schema) {
    this.setState(({entity})=>{
      const nextEntity = this.props.layout.model.createEntity(schema);
      if(entity){
        const nextEntityProps = nextEntity.schema.getProperties()
        entity.getProperties()
          .forEach(property => {
            const similarProp = nextEntityProps.has(property.name) && nextEntityProps.get(property.name);
            if(similarProp && (similarProp.type === property.type)){
              // this is the case when we can save the value
              nextEntity.properties.set(similarProp, entity.getProperty(property))
            }
          })
      }
      this.props.layout.layout()
      return ({
        entity: nextEntity
      })
    })
  }

  render() {
    const {layout, subsequentOf} = this.props;
    return <div>
      <SelectSchema
        model={layout.model}
        subsequentOf={subsequentOf}
        onSchemaSelect={this.onSchemaSelect}
      />
      <Divider />
      {this.state.entity &&  <EntityEditor
        entity={this.state.entity}
        layout={layout}
        updateLayout={this.props.updateLayout}
      /> }
    </div>
  }
}