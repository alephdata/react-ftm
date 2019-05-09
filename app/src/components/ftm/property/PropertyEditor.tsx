import React, {Component} from "react";
import {Entity, Property, Values} from "@alephdata/followthemoney";
import {DateType} from "../type/DateType";
import {TextType} from "../type/TextType";

interface IPropertyEditorProps {
  entity: Entity,
  property: Property,
  onEntityChanged: (nextEntity: Entity) => void
}

export class PropertyEditor extends Component<IPropertyEditorProps> {
  onPropertyChanged = (nextValues: Values) => {
    this.props.entity.properties.set(this.props.property, nextValues);
    this.props.onEntityChanged(this.props.entity)
  }

  render() {
    const {entity, property} = this.props;
    const values = entity.getProperty(property);
    const commonProps = {
      onPropertyChanged: this.onPropertyChanged,
      values: values,
      property: property,
      entity: entity
    };

    if (DateType.group.has(property.type.name)) {
      return <DateType
        {...commonProps}
      />;
    }

    // fallback
    return <TextType
      {...commonProps}
    />;
  }
}