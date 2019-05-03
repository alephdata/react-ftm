import React, {PureComponent, ReactNode} from 'react';
import {TagInput, ControlGroup, FormGroup} from '@blueprintjs/core'
import {Entity, Property, Values} from "@alephdata/followthemoney";
import {GraphLayout} from "@alephdata/vislib";


interface ITypeProps {
  value: Values
  property: Property
  entity: Entity
  onPropertyChanged: (values: Values, property:Property) => void
}







class TextType extends PureComponent<ITypeProps> {
  static group = ['text', 'string' ]

  onChange = (values: Array<string | ReactNode>) => {
    // TODO: @pudo maybe we need to implement Entity.removeProperty  in FTM?
    this.props.onPropertyChanged(values as unknown as Values, this.props.property)
  }

  render() {
    return <FormGroup
      label={this.props.property.name}
    >
      <ControlGroup
        vertical
      >
        <TagInput
          onChange={this.onChange}
          values={this.props.value}
        />
      </ControlGroup>
    </FormGroup>
  }
}


interface IPropertyProps {
  entity: Entity,
  property: Property,
  onEntityChanged: (nextEntity:Entity)=>void
}
// 7ce99c16990557f8a859a6c6ab080dc8cf1e1506 - MARIOT
// 47b73abc9dd57c83c3ae65cd70dc48541b15a1e3 - JAMAL
class PropertyEditor extends PureComponent<IPropertyProps> {
  onPropertyChanged = (nextValues:Values) => {
    const nextEntity = this.props.entity.clone();
    nextEntity.properties.set(this.props.property, nextValues);
    this.props.onEntityChanged(nextEntity)
  }

  render() {
    const {entity, property} = this.props;
    const value = entity.getProperty(property);
    if (~TextType.group.indexOf(property.type.name)) {
      return <TextType
        onPropertyChanged={this.onPropertyChanged}
        value={value}
        property={property}
        entity={entity}
      />
    }

    return <TextType
      onPropertyChanged={this.onPropertyChanged}
      value={value}
      property={property}
      entity={entity}
    />;
  }
}

interface ISchemaProps {
  entity: Entity,
  layout: GraphLayout
  updateLayout: (layout:GraphLayout) => void
}

export default class EntityEditor extends PureComponent<ISchemaProps> {
  onEntityChanged = (nextEntity:Entity) => {
    this.props.layout.updateEntity(this.props.entity, nextEntity);
    this.props.updateLayout(this.props.layout)
  }

  render() {
    const {entity} = this.props;
    const label = entity.getCaption() || <i>{entity.schema.name}</i>;
    const properties = Array.from(
      entity.schema.getProperties().values()
    ).sort(p => entity.getProperty(p).length);


    return <div>
      <h2>{label}</h2>
      {properties.map(property => <PropertyEditor
        key={property.name}
        onEntityChanged={this.onEntityChanged}
        entity={entity}
        property={property}
      />)}
    </div>
  }
}