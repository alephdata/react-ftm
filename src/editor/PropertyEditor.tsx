import * as React from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { Entity, Property, Values } from '@alephdata/followthemoney';
import { DateEdit } from '../types/DateEdit';
import { TextEdit } from '../types/TextEdit';
import { EntityEdit } from '../types/EntityEdit';
import { GraphContext } from '../GraphContext';
import { CountryEdit } from "../types/CountryEdit";

const messages = defineMessages({
  required: {
    id: 'editor.property_required',
    defaultMessage: 'This property is required',
  },
});

interface IPropertyEditorProps extends WrappedComponentProps {
  entity: Entity,
  property: Property,
  onSubmit: (nextEntity: Entity) => void
}

interface IPropertyEditorState {
  values: Values,
}

class PropertyEditorBase extends React.Component<IPropertyEditorProps, IPropertyEditorState> {
  static contextType = GraphContext;
  context!: React.ContextType<typeof GraphContext>;

  constructor(props:IPropertyEditorProps) {
    super(props);

    this.state = {
      values: props.entity?.getProperty(props.property) || []
    };
  }

  onChange = (values: Values) => {
    this.setState({ values });
  }

  onSubmit = (overrideStateValues?: Values) => {
    if (overrideStateValues) {
      this.setState({ values: overrideStateValues });
    }
    if (!this.checkErrors()) {
      this.props.entity.properties.set(this.props.property, overrideStateValues || this.state.values);
      this.props.onSubmit(this.props.entity)
    }
  }

  checkErrors() {
    const { intl, property } = this.props;
    const { values } = this.state;

    if (property.required) {
      return values && values.length && values[0] ? null : intl.formatMessage(messages.required);
    }
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

    const foundError = this.checkErrors();

    return (
      <form onSubmit={e => { e.preventDefault(); this.onSubmit(); }}>
        {content}
        {foundError && (
          <div className="EntityViewer__property-list-item__error">{foundError}</div>
        )}
      </form>
    )
  }
}

export const PropertyEditor = injectIntl(PropertyEditorBase);
