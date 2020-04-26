import * as React from 'react'
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { Entity, Property, Schema, Values } from '@alephdata/followthemoney';
import { TextEdit } from '../types/TextEdit';
import EntityEdit from '../types/EntityEdit';
import { CountryEdit } from "../types/CountryEdit";
import { TopicEdit } from "../types/TopicEdit";
import { validate } from './utils';

interface IPropertyEditorProps extends WrappedComponentProps {
  entity: Entity,
  property: Property,
  entitySuggestions: Array<Entity>,
  onSubmit: (nextEntity: Entity) => void
  onChange?: (values: Values) => void
  fetchEntitySuggestions?: ({query, schema}: {query: string, schema?: Schema}) => void
  resolveEntityReference?: (entityId: string) => Entity | undefined,
  usePortal?: boolean
}

interface IPropertyEditorState {
  values: Values,
  error: any | null,
  entitySuggestions: Array<Entity>
}

class PropertyEditorBase extends React.Component<IPropertyEditorProps, IPropertyEditorState> {
  constructor(props:IPropertyEditorProps) {
    super(props);
    const { entity, property, resolveEntityReference } = props;

    let values = entity?.getProperty(property) || [];
    if (property.type.name === 'entity') {
      values = values.map(val => (typeof val === 'string' ? resolveEntityReference(val) : val));
    }

    this.state = {
      entitySuggestions: { isPending: false, results: [] },
      values,
      error: null,
    };

    this.fetchEntitySuggestions = this.fetchEntitySuggestions.bind(this)
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

  async fetchEntitySuggestions(query) {
    const { entity, intl, property, usePortal } = this.props;
    this.setState({ entitySuggestions: { isPending: true, results: [] }});
    const suggestions = await this.props.fetchEntitySuggestions({ query, schema: property.getRange() })
    this.setState({ entitySuggestions: { isPending: false, results: suggestions }});
  }

  render() {
    const { entity, intl, property, usePortal } = this.props;
    const { entitySuggestions, error, values } = this.state;

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
      content = <EntityEdit entitySuggestions={entitySuggestions} fetchEntitySuggestions={this.fetchEntitySuggestions} {...commonProps} />
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
