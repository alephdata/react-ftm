import * as React from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { Alignment, Button, ControlGroup, InputGroup, Intent, Menu, MenuItem, Spinner, Divider } from '@blueprintjs/core'
import { ItemListRenderer, IItemListRendererProps, Suggest } from '@blueprintjs/select';
import { Entity as FTMEntity, Schema as FTMSchema } from '@alephdata/followthemoney'

import { EntityManager } from '../EntityManager';
import { GraphContext, IGraphContext } from '../GraphContext'
import { VertexSchemaSelect } from '../editor'
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
    this.itemListRenderer = this.itemListRenderer.bind(this);

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
    this.setState({ query });
    this.fetchSuggestions({ query, schema: this.state.schema })
  }

  onSchemaSelect(schema: FTMSchema) {
    this.setState({ schema });
    this.fetchSuggestions({ query: this.state.query, schema })
  }

  async fetchSuggestions({ query, schema }:{ query: string, schema: FTMSchema }) {
    const { layout } = this.context as IGraphContext

    if (query.length === 0) {
      this.setState({ suggestions: [] });
    } else {
      const { entityManager } = this.props;
      this.setState({ isFetchingSuggestions: true });
      const suggestions = await entityManager.getEntitySuggestions(query, schema);
      const filteredSuggestions = suggestions.filter((entity: FTMEntity) => !layout.hasEntity(entity));
      this.setState({ isFetchingSuggestions: false, suggestions: filteredSuggestions });
    }
  }

  getSchema(): FTMSchema {
    const { layout } = this.context as IGraphContext
    return this.state.schema || layout.entityManager.model.getSchema('Person')
  }

  async onSubmit(entityData: string | FTMEntity) {
    if (!entityData) return;
    const { layout, updateLayout, viewport, updateViewport } = this.context as IGraphContext
    const { query } = this.state
    const schema = this.getSchema();
    let entity;

    this.setState({ isProcessing: true });

    try {
      if (typeof entityData === 'string') {
        const captionProperty = schema?.caption[0];
        if (captionProperty) {
          entity = await layout.createEntity({ schema, properties: { [captionProperty]: query } });
        } else {
          entity = await layout.createEntity({ schema });
        }
      } else {
        entity = entityData;
        layout.addEntity(entity);
      }
    } catch {
      this.setState({ isProcessing: false })
      return;
    }

    const vertex = layout.getVertexByEntity(entity)
    const position = this.props.vertexCreateOptions?.initialPosition || viewport.center;

    if (vertex) {
      layout.vertices.set(vertex.id, vertex.snapPosition(position))
      layout.selectElement(vertex)
      updateLayout(layout, { created: [entity] }, { modifyHistory: true, clearSearch: true });
      this.setState({query: '', isProcessing: false, suggestions: []})
      this.props.toggleDialog()
    }
  }

  itemListRenderer(rendererProps: IItemListRendererProps<FTMEntity>) {
    const { filteredItems, itemsParentRef, renderItem } = rendererProps;
    const { isFetchingSuggestions, isProcessing } = this.state;

    if ((!isFetchingSuggestions && !filteredItems.length) || isProcessing) return;

    const content = isFetchingSuggestions
      ? <Spinner className="VertexCreateDialog__spinner" size={Spinner.SIZE_SMALL} />
      : filteredItems.map(renderItem);

    return (
      <Menu ulRef={itemsParentRef}>
        {content}
      </Menu>
    );
  }

  render() {
    const { intl, layout } = this.context as IGraphContext
    const { isOpen, toggleDialog } = this.props;
    const { isFetchingSuggestions, isProcessing, query, suggestions } = this.state;
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
        onClose={toggleDialog}
        className="VertexCreateDialog"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // only allow submit of input on enter when no suggestions are present
          !suggestions.length && query.length && this.onSubmit(query)
        }}>
          <div className="bp3-dialog-body">
            <ControlGroup fill>
              <VertexSchemaSelect
                model={layout.entityManager.model}
                schema={schema}
                onSelect={this.onSchemaSelect}
              >
                <Button
                  large
                  text={vertexSelectText}
                  alignText={Alignment.LEFT}
                  icon={vertexSelectIcon}
                  rightIcon="caret-down"
                  className="VertexCreateDialog__schema-select"
                />
              </VertexSchemaSelect>
              <Suggest
                fill
                inputValueRenderer={query => typeof query === 'string' ? query : query.getCaption()}
                items={suggestions}
                itemListRenderer={this.itemListRenderer as ItemListRenderer<FTMEntity>}
                popoverProps={{
                  popoverClassName: "VertexCreateDialog__popover",
                  minimal: true,
                  position: 'bottom-left',
                }}
                inputProps={{
                  className: "VertexCreateDialog__input",
                  large: true,
                  round: false,
                  placeholder: placeholder,
                }}
                itemRenderer={(entity, { handleClick, modifiers }) => (
                  <MenuItem
                    active={modifiers.active}
                    disabled={modifiers.disabled}
                    key={entity.id}
                    onClick={handleClick}
                    text={<Entity.Label entity={entity} icon />}
                    style={modifiers.active ? { fill: 'white' } : {}}
                  />
                )}
                onQueryChange={this.onQueryChange}
                onItemSelect={this.onSubmit}
                query={query}
              />
              <Button
                large
                icon="arrow-right"
                disabled={!query.length}
                onClick={() => this.onSubmit(query)}
                className="VertexCreateDial"
              />
            </ControlGroup>
          </div>
        </form>
      </Dialog>
    );
  }
}

export const VertexCreateDialog = injectIntl(VertexCreateDialogBase);
