import * as React from 'react'
import {Entity, Property, Values} from '@alephdata/followthemoney';
import {DateEdit} from '../types/DateEdit';
import {TextEdit} from '../types/TextEdit';
import {EntityEdit} from '../types/EntityEdit';
import {GraphContext} from '../GraphContext';
import {CountryEdit} from "../types/CountryEdit";

interface IPropertyEditorProps {
  entity: Entity,
  property: Property,
  onEntityChanged: (nextEntity: Entity) => void
}

export class PropertyEditor extends React.Component<IPropertyEditorProps> {
  static contextType = GraphContext;
  context!: React.ContextType<typeof GraphContext>;

  onPropertyChanged = (nextValues: Values) => {
    this.props.entity.properties.set(this.props.property, nextValues);
    this.props.onEntityChanged(this.props.entity)
  }

  render() {
    if (!this.context) return null;

    const { entity, property } = this.props;
    const values = entity.getProperty(property);
    const commonProps = {
      onPropertyChanged: this.onPropertyChanged,
      values: values,
      property: property,
      entity: entity
    };

    if (DateEdit.group.has(property.type.name)) {
      return <DateEdit {...commonProps} />;
    }

    if (CountryEdit.group.has(property.type.name)) {
      return <CountryEdit {...commonProps} />;
    }

    if (EntityEdit.group.has(property.type.name)) {
      return <EntityEdit entities={this.context.layout.entities} {...commonProps} />
    }

    // fallback
    return <TextEdit {...commonProps} />;
  }
}
