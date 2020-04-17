import * as React from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { Entity, Property, Values } from '@alephdata/followthemoney';
import { TextEdit } from '../types/TextEdit';
import EntityEdit from '../types/EntityEdit';
import { CountryEdit } from "../types/CountryEdit";
import { TopicEdit } from "../types/TopicEdit";
import { isValidUrl } from '../utils';

const messages = defineMessages({
  invalidDate: {
    id: 'editor.property_date_invalid',
    defaultMessage: 'Date format: yyyy-m-d',
  },
  invalidUrl: {
    id: 'editor.property_url_invalid',
    defaultMessage: 'Invalid URL format',
  },
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
  onChange?: (values: Values) => void
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
    const propType = property.type.name;

    if (propType === 'url') {
      return values.some(val => !isValidUrl(val as string)) ? intl.formatMessage(messages.invalidUrl) : null;
    } else if (propType === 'date') {
      const dateRegex = RegExp(/^([12]\d{3}(-[01]?[0-9](-[0123]?[0-9]([T ]([012]?\d(:\d{1,2}(:\d{1,2}(\.\d{6})?(Z|[-+]\d{2}(:?\d{2})?)?)?)?)?)?)?)?)?$/)
      return values.some(val => !dateRegex.test(val as string)) ? intl.formatMessage(messages.invalidDate) : null;
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

    if (CountryEdit.group.has(property.type.name)) {
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
