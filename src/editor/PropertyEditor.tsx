import * as React from 'react'
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { Entity, Property, Values } from '@alephdata/followthemoney';
import { TextEdit } from '../types/TextEdit';
import EntityEdit from '../types/EntityEdit';
import { CountryEdit } from "../types/CountryEdit";
import { TopicEdit } from "../types/TopicEdit";
import { validate, validationErrors } from './utils';

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
      values: props.entity?.getProperty(props.property) || [],
      error: null,
    };
  }

  onChange = (values: Values) => {
    if (this.props.onChange) {
      this.props.onChange(values);
    }
    this.setState({ values });
  }

  onSubmit = (overrideStateValues?: Values) => {
    const { entity, property } = this.props;
    const values = overrideStateValues || this.state.values;
    if (overrideStateValues) {
      this.onChange(overrideStateValues);
    }
    const validationError = validate({ schema: entity.schema, property, values });
    if (validationError) {
      this.setState({ error: validationError });
    } else {
      entity.properties.set(property, values);
      this.props.onSubmit(entity)
    }
  }

  render() {
    const { entitiesList, entity, intl, property, usePortal } = this.props;
    const { error, values } = this.state;

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

    return (
      <>
        {content}
        {error && (
          <div className="EntityViewer__property-list-item__error">{intl.formatMessage(error)}</div>
        )}
      </>
    )
  }
}

export const PropertyEditor = injectIntl(PropertyEditorBase);
