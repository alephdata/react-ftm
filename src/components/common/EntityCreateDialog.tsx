import * as React from 'react'
import { defineMessages } from 'react-intl';
import { Alignment, Button, ControlGroup, InputGroup } from '@blueprintjs/core'
import { Entity as FTMEntity, Schema as FTMSchema, Values } from '@alephdata/followthemoney'

import { GraphContext } from 'NetworkDiagram/GraphContext'
import { EntitySelect, SchemaSelect } from 'editors'
import { Schema } from 'types';
import { Dialog } from 'components/common'

import './EntityCreateDialog.scss';

const messages = defineMessages({
  title: {
    id: 'dialog.vertex_create.title',
    defaultMessage: 'Add entity',
  },
  type_placeholder: {
    id: 'dialog.vertex_create.type_placeholder',
    defaultMessage: 'Pick a type',
  },
  no_results: {
    id: 'dialog.vertex_create.no_suggestions',
    defaultMessage: 'No suggestions found',
  },
});

interface IEntityCreateDialogProps {
  isOpen: boolean,
  toggleDialog: () => any,
  entityCreateOptions?: any
  schema: FTMSchema
}

interface IEntityCreateDialogState {
  query: string,
  isProcessing: boolean,
  isFetchingSuggestions: boolean,
  schema: FTMSchema
  suggestions: FTMEntity[],
}

export class EntityCreateDialog extends React.Component<IEntityCreateDialogProps, IEntityCreateDialogState> {
  static contextType = GraphContext;

  constructor(props: any) {
    super(props);

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onSchemaSelect = this.onSchemaSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      query: '',
      isFetchingSuggestions: false,
      isProcessing: false,
      suggestions: [],
      schema: props.schema
    };
  }

  componentDidUpdate(prevProps: IEntityCreateDialogProps) {
    const schema = this.props.entityCreateOptions?.initialSchema;
    if (schema && prevProps.entityCreateOptions?.initialSchema !== schema) {
      this.setState({
        schema,
      })
    }
  }

  onQueryChange(query: string) {
    if (!this.state.isProcessing) {
      this.setState({ query });
      this.fetchSuggestions(query, [this.state.schema])
    }
  }

  onSchemaSelect(schema: FTMSchema) {
    this.setState({ schema });
    this.fetchSuggestions(this.state.query, [schema])
  }

  async fetchSuggestions(query: string, schemata: Array<FTMSchema>) {
    const { entityManager } = this.context
    if (entityManager.hasSuggest) {
      this.setState({ isFetchingSuggestions: true });
      const suggestions = await entityManager.getEntitySuggestions(false, query, schemata);
      const filteredSuggestions = suggestions.filter((entity: FTMEntity) => !entityManager.hasEntity(entity));
      this.setState({ isFetchingSuggestions: false, suggestions: filteredSuggestions });
    }
  }

  getSchema(): FTMSchema {
    const { entityManager } = this.context
    return this.state.schema || entityManager.model.getSchema('Person')
  }

  getCaptionProperty() {
    return this.getSchema()?.caption[0];
  }

  async onSubmit(values: Values) {
    if (!values || !values.length) return;
    const entityData = values[0];
    const { entityManager, layout, updateLayout, viewport } = this.context;
    const { entityCreateOptions } = this.props;
    const center = entityCreateOptions?.initialPosition || viewport.center;
    const { query } = this.state
    const schema = this.getSchema();
    let entity;

    this.setState({ isProcessing: true });

    try {
      if (typeof entityData === 'string') {
        const captionProperty = this.getCaptionProperty();
        if (captionProperty) {
          entity = entityManager.createEntity({ schema, properties: { [captionProperty]: query } });
        } else {
          entity = entityManager.createEntity({ schema });
        }
      } else {
        entity = entityManager.createEntity(entityData);
      }
      layout.layout(entityManager.getEntities(), center);
      layout.selectByEntityIds([entity.id]);
    } catch (e) {
      this.setState({ isProcessing: false })
      return;
    }

    const vertex = layout.getVertexByEntity(entity)

    if (vertex) {
      if (entityCreateOptions?.initialPosition) {
        layout.vertices.set(vertex.id, vertex.snapPosition(center))
      }
      updateLayout(layout, { created: [entity] }, { modifyHistory: true, clearSearch: true });
      this.setState({query: '', isProcessing: false, suggestions: []})
      this.props.toggleDialog()
    }
  }

  render() {
    const { entityManager, intl } = this.context
    const { isOpen, toggleDialog } = this.props;
    const { isFetchingSuggestions, isProcessing, query, suggestions } = this.state;
    const { hasSuggest } = entityManager;
    const schema = this.getSchema();
    const captionProperty = this.getCaptionProperty();
    const placeholder = `${schema.label} ${captionProperty}`;
    const vertexSelectText = schema ? schema.label : intl.formatMessage(messages.type_placeholder);
    const vertexSelectIcon = schema ? <Schema.Icon schema={schema} /> : 'select';

    console.log('in entity create')

    return (
      <Dialog
        icon="new-object"
        isOpen={isOpen}
        isProcessing={isProcessing}
        title={intl.formatMessage(messages.title)}
        onClose={() => toggleDialog()}
        className="EntityCreateDialog"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // only allow submit of input on enter when no suggestions are present
          !suggestions.length && query.length && this.onSubmit([query])
        }}>
          <div className="bp3-dialog-body">
            <ControlGroup fill>
              <SchemaSelect
                model={entityManager.model}
                onSelect={this.onSchemaSelect}
                optionsFilter={schema => schema.isThing()}
              >
                <Button
                  large
                  fill
                  text={vertexSelectText}
                  alignText={Alignment.LEFT}
                  icon={vertexSelectIcon}
                  rightIcon="caret-down"
                  className="EntityCreateDialog__schema-select"
                />
              </SchemaSelect>
              {hasSuggest && (
                <EntitySelect
                  onSubmit={this.onSubmit}
                  values={[]}
                  allowMultiple={true}
                  isFetching={isFetchingSuggestions}
                  entitySuggestions={suggestions}
                  onQueryChange={this.onQueryChange}
                  popoverProps={{ usePortal: false }}
                  inputProps={{ large: true }}
                  placeholder={placeholder}
                  noResultsText={intl.formatMessage(messages.no_results)}
                />
              )}
              {!hasSuggest && (
                <InputGroup
                  autoFocus
                  large
                  fill
                  placeholder={placeholder}
                  value={query}
                  onChange={(e: any) => this.onQueryChange(e.target.value)}
                />
              )}
              <Button
                large
                icon="arrow-right"
                disabled={!query.length}
                onClick={() => this.onSubmit([query])}
                className="EntityCreateDialog__submit"
              />
            </ControlGroup>
          </div>
        </form>
      </Dialog>
    );
  }
}
