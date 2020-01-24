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
  onSubmit: (nextEntity: Entity) => void
}

interface IPropertyEditorState {
  values: Values,
}

export class PropertyEditor extends React.Component<IPropertyEditorProps, IPropertyEditorState> {
  static contextType = GraphContext;
  context!: React.ContextType<typeof GraphContext>;

  constructor(props:IPropertyEditorProps) {
    super(props);

    this.state = {
      values: props.entity?.getProperty(props.property) || []
    };
  }

  onChange = (values: Values) => {
    console.log('propeditor onchange', values);
    this.setState({ values });
  }

  onSubmit = (overrideStateValues?: Values) => {
    console.log('submit!', overrideStateValues || this.state.values);

    if (overrideStateValues) {
      this.setState({ values: overrideStateValues });
    }

    this.props.entity.properties.set(this.props.property, overrideStateValues || this.state.values);
    this.props.onSubmit(this.props.entity)
  }

  render() {
    if (!this.context) return null;
    const { entity, property } = this.props;
    const { values } = this.state;

    const commonProps = {
      onSubmit: this.onSubmit,
      onChange: this.onChange,
      values: values,
      property: property,
      entity: entity
    };
    let content;

    if (DateEdit.group.has(property.type.name)) {
      content = <DateEdit {...commonProps} />;
    } else if (CountryEdit.group.has(property.type.name)) {
      content = <CountryEdit {...commonProps} />;
    } else if (EntityEdit.group.has(property.type.name)) {
      content = <EntityEdit entities={this.context.layout.entities} {...commonProps} />
    } else {
      content = <TextEdit {...commonProps} />;
    }

    return (
      <form onSubmit={e => { e.preventDefault(); this.onSubmit(); }}>
        {content}
      </form>
    )
  }
}
