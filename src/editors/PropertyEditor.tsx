import * as React from 'react'
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { Entity, Property, Schema, Values } from '@alephdata/followthemoney';
import { CountrySelect, TopicSelect, EntitySelect, TextEdit } from './';
import { validate } from '../utils';

const TAB_KEY = 9;

interface IPropertyEditorProps extends WrappedComponentProps {
  entity: Entity,
  property: Property,
  onSubmit: (entity: Entity) => void
  onChange?: (values: Values) => void
  fetchEntitySuggestions?: (queryText: string, schemata?: Array<Schema>) => Promise<Entity[]>
  resolveEntityReference?: (entityId: string) => Entity | undefined,
  usePortal?: boolean
}

interface IPropertyEditorState {
  values: Values,
  error: any | null,
  entitySuggestions: { isPending: boolean, results: Array<Entity> }
}

class PropertyEditor extends React.Component<IPropertyEditorProps, IPropertyEditorState> {
  constructor(props:IPropertyEditorProps) {
    super(props);
    const { entity, property, resolveEntityReference } = props;

    let values = entity?.getProperty(property.name) || [];
    if (property.type.name === 'entity' && resolveEntityReference) {
      values = values.map(val => {
        if (typeof val === 'string') {
          return resolveEntityReference(val) || '';
        }
        return val;
      });
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

  async fetchEntitySuggestions(query: string) {
    const { entity, intl, property, usePortal } = this.props;
    if (this.props.fetchEntitySuggestions) {
      this.setState({ entitySuggestions: { isPending: true, results: [] }});
      const suggestions = await this.props.fetchEntitySuggestions(query, [property.getRange()]);
      this.setState({ entitySuggestions: { isPending: false, results: suggestions }});
    }
  }

  render() {
    const { entity, intl, property, usePortal } = this.props;
    const { entitySuggestions, error, values } = this.state;
    const propType = property.type;

    const commonProps = {
      onSubmit: this.onSubmit,
      onChange: this.onChange,
      values,
      usePortal: usePortal === undefined ? true : usePortal,
    };
    let content;

    if (propType.name === 'country') {
      content = <CountrySelect fullList={propType.values} {...commonProps} />;
    } else if (propType.name === 'topic') {
      content = <TopicSelect fullList={propType.values} {...commonProps} />;
    } else if (propType.name === 'entity') {
      content = <EntitySelect {...commonProps} entity={entity} values={values as Array<Entity>} entitySuggestions={entitySuggestions} fetchEntitySuggestions={this.fetchEntitySuggestions}  />
    } else {
      content = <TextEdit {...commonProps} />;
    }

    return (
      <>
        <form
          onSubmit={(e:any) => { e.preventDefault(); e.stopPropagation(); }}
          onKeyDown={(e:any) => e.keyCode === TAB_KEY ? this.onSubmit() : null}
        >
          {content}
        </form>
        {error && (
          <div className="EntityViewer__property-list-item__error">{intl.formatMessage(error)}</div>
        )}
      </>
    )
  }
}

export default injectIntl(PropertyEditor);
