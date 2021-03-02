import * as React from 'react'
import { compose } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { Entity, Property, Schema, Values } from '@alephdata/followthemoney';

import { IEntityContext } from 'contexts/EntityContext';
import { CountrySelect, TopicSelect, EntitySuggest, TextEdit } from './';
import { validate } from 'utils';

const TAB_KEY = 9;

interface IPropertyEditorProps extends WrappedComponentProps {
  entity: Entity,
  property: Property,
  onSubmit: (entity: Entity) => void
  onChange?: (values: Values) => void
  entityContext: IEntityContext
  popoverProps?: any
}

interface IPropertyEditorState {
  entitiesQueryText: string
  values: Values,
  error: any | null,
}

class PropertyEditor extends React.Component<IPropertyEditorProps & PropsFromRedux, IPropertyEditorState> {
  constructor(props:IPropertyEditorProps & PropsFromRedux) {
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
      entitiesQueryText: '',
      values,
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
    const validationError = validate({ entity, schema: entity.schema, property, values });
    if (validationError) {
      this.setState({ error: validationError });
    } else {
      const changed = entity.clone()
      changed.properties.set(property, values);
      this.props.onSubmit(changed)
    }
  }

  render() {
    const { entity, entityContext, intl, property, popoverProps } = this.props;
    const { entitiesQueryText, error, values } = this.state;
    const propType = property.type;

    const commonProps = {
      onSubmit: this.onSubmit,
      values,
      popoverProps,
    };
    let content;

    if (propType.name === 'country') {
      content = <CountrySelect fullList={propType.values} {...commonProps} />;
    } else if (propType.name === 'topic') {
      content = <TopicSelect fullList={propType.values} {...commonProps} />;
    } else if (propType.name === 'entity') {
      content = (
        <EntitySuggest
          onSubmit={this.onSubmit}
          onQueryChange={(queryText: string) => this.setState({ entitiesQueryText: queryText })}
          queryText={entitiesQueryText}
          schemata={[property.getRange()]}
          entityContext={entityContext}
          filterSuggestions={(e: Entity) => (e.id !== entity.id)}
          suggestLocalEntities
          entitySelectProps={{
            allowMultiple: !entity.schema.isEdge,
            popoverProps,
            values
          }}
        />
      );
    } else {
      content = <TextEdit onChange={this.onChange} {...commonProps} />;
    }

    return (
      <>
        <div
          onKeyDown={(e:any) => e.keyCode === TAB_KEY ? this.onSubmit() : null}
        >
          {content}
        </div>
        {error && (
          <div className="error-text">{intl.formatMessage(error)}</div>
        )}
      </>
    )
  }
}

const mapStateToProps = (state: any, ownProps: IPropertyEditorProps) => {
  const { entityContext } = ownProps;
  return ({
    resolveEntityReference: (id: any) => entityContext.selectEntity(state, id)
  });
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(
  injectIntl(PropertyEditor)
);
