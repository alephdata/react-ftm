import * as React from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { Alignment, Button, ControlGroup, InputGroup, Intent, Menu, MenuItem, Spinner, Divider } from '@blueprintjs/core'
import { Entity as FTMEntity, Schema as FTMSchema, Values } from '@alephdata/followthemoney'

import { EntityManager } from '../EntityManager';
import { GraphContext, IGraphContext } from '../GraphContext'
import { EntitySelect, SchemaSelect } from '../editors'
import { Entity, Schema } from '../types';
import { Point } from '../layout'
import Dialog from './Dialog'
import c from 'classnames';

import './VertexCreateDialog.scss';

const messages = defineMessages({
  title: {
    id: 'dialog.vertex_create.title',
    defaultMessage: 'Add entity',
  },
  name_placeholder: {
    id: 'dialog.vertex_create.name_placeholder',
    defaultMessage: '{schema} name',
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

interface IVertexCreateDialogProps extends WrappedComponentProps {
  isOpen: boolean,
  toggleDialog: () => any,
  vertexCreateOptions?: any
  entityManager: EntityManager,
}

interface IVertexCreateDialogState {
  query: string,
  isProcessing: boolean,
  isFetchingSuggestions: boolean,
  schema: FTMSchema
  suggestions: FTMEntity[],
}

export class VertexCreateDialogBase extends React.Component<IVertexCreateDialogProps, IVertexCreateDialogState> {
  static contextType = GraphContext;
  context!: React.ContextType<typeof GraphContext>;
  state: IVertexCreateDialogState;

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
      schema: props.entityManager.model.getSchema('Person')
    };
  }

  componentDidUpdate(prevProps: IVertexCreateDialogProps) {
    const schema = this.props.vertexCreateOptions?.initialSchema;
    if (schema && prevProps.vertexCreateOptions?.initialSchema !== schema) {
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
    const { layout } = this.context as IGraphContext
    const { entityManager } = this.props;
    if (entityManager.hasSuggest) {
      this.setState({ isFetchingSuggestions: true });
      const suggestions = await entityManager.getEntitySuggestions(query, schemata);
      const filteredSuggestions = suggestions.filter((entity: FTMEntity) => !layout.hasEntity(entity));
      this.setState({ isFetchingSuggestions: false, suggestions: filteredSuggestions });
    }
  }

  getSchema(): FTMSchema {
    const { layout } = this.context as IGraphContext
    return this.state.schema || layout.entityManager.model.getSchema('Person')
  }

  async onSubmit(values: Values) {
    if (!values || !values.length) return;
    const entityData = values[0];
    const { layout, updateLayout, viewport, updateViewport } = this.context as IGraphContext
    const { vertexCreateOptions } = this.props;
    const center = vertexCreateOptions?.initialPosition || viewport.center;
    const { query } = this.state
    const schema = this.getSchema();
    let entity;

    this.setState({ isProcessing: true });

    try {
      if (typeof entityData === 'string') {
        const captionProperty = schema?.caption[0];
        if (captionProperty) {
          entity = layout.createEntity({ schema, properties: { [captionProperty]: query } });
        } else {
          entity = layout.createEntity({ schema });
        }
      } else {
        entity = entityData;
      }
      layout.addEntities([entity], center);
    } catch (e) {
      this.setState({ isProcessing: false })
      return;
    }

    const vertex = layout.getVertexByEntity(entity)

    if (vertex) {
      if (vertexCreateOptions?.initialPosition) {
        layout.vertices.set(vertex.id, vertex.snapPosition(center))
      }
      updateLayout(layout, { created: [entity] }, { modifyHistory: true, clearSearch: true });
      this.setState({query: '', isProcessing: false, suggestions: []})
      this.props.toggleDialog()
    }
  }

  render() {
    const { intl, layout } = this.context as IGraphContext
    const { entityManager, isOpen, toggleDialog } = this.props;
    const { isFetchingSuggestions, isProcessing, query, suggestions } = this.state;
    const { hasSuggest } = entityManager;
    const schema = this.getSchema()
    const placeholder = intl.formatMessage(messages.name_placeholder, { schema: schema.label });
    const vertexSelectText = schema ? schema.label : intl.formatMessage(messages.type_placeholder);
    const vertexSelectIcon = schema ? <Schema.Icon schema={schema} /> : 'select';

    return (
      <Dialog
        icon="new-object"
        isOpen={isOpen}
        isProcessing={isProcessing}
        title={intl.formatMessage(messages.title)}
        onClose={() => toggleDialog()}
        className="VertexCreateDialog"
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
                model={layout.entityManager.model}
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
                  className="VertexCreateDialog__schema-select"
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
                  noResultsText={intl.formatMessage(messages.no_results)}
                />
              )}
              {!hasSuggest && (
                <InputGroup
                  autoFocus
                  large
                  fill
                  value={query}
                  onChange={(e) => this.onQueryChange(e.target.value)}
                />
              )}
              <Button
                large
                icon="arrow-right"
                disabled={!query.length}
                onClick={() => this.onSubmit([query])}
                className="VertexCreateDialog__submit"
              />
            </ControlGroup>
          </div>
        </form>
      </Dialog>
    );
  }
}

export const VertexCreateDialog = injectIntl(VertexCreateDialogBase);
