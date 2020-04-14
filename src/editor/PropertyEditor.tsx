import * as React from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { Entity, Property, Values } from '@alephdata/followthemoney';
import { DateEdit } from '../types/DateEdit';
import { TextEdit } from '../types/TextEdit';
import EntityEdit from '../types/EntityEdit';
import { CountryEdit } from "../types/CountryEdit";
import { TopicEdit } from "../types/TopicEdit";

const messages = defineMessages({
  required: {
    id: 'editor.property_required',
    defaultMessage: 'This property is required',
  },
});

interface IPropertyEditorProps extends WrappedComponentProps {
  entity: Entity,
  property: Property,
  entitiesList: Map<string, Entity>,
  onSubmit: (nextEntity: Entity) => void
  usePortal?: boolean
}

interface IPropertyEditorState {
  values: Values,
}

class PropertyEditorBase extends React.Component<IPropertyEditorProps, IPropertyEditorState> {
  constructor(props:IPropertyEditorProps) {
    super(props);

    this.state = {
      values: props.entity?.getProperty(props.property) || []
    };
  }

  onChange = (values: Values) => {
    if (this.props.onChange) {
      this.props.onChange(values);
    }
    this.setState({ values });
  }

  onSubmit = (overrideStateValues?: Values) => {
    if (overrideStateValues) {
      this.onChange(overrideStateValues);
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
    const { entitiesList, entity, property, usePortal } = this.props;
    const { values } = this.state;

    const commonProps = {
      onSubmit: this.onSubmit,
      onChange: this.onChange,
      values,
      property,
      entity,
      usePortal: usePortal === undefined ? true : usePortal,
    };
    let content;

    if (DateEdit.group.has(property.type.name)) {
      content = <DateEdit {...commonProps} />;
    } else if (CountryEdit.group.has(property.type.name)) {
      content = <CountryEdit {...commonProps} />;
    } else if (TopicEdit.group.has(property.type.name)) {
      content = <TopicEdit {...commonProps} />;
    } else if (EntityEdit.group.has(property.type.name)) {
      content = <EntityEdit entities={entitiesList} {...commonProps} />
    } else {
      content = <TextEdit {...commonProps} />;
    }

    const foundError = this.checkErrors();

    return (
      <>
        {content}
        {foundError && (
          <div className="EntityViewer__property-list-item__error">{foundError}</div>
        )}
      </>
    )
  }
}

export const PropertyEditor = injectIntl(PropertyEditorBase);
