import * as React from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { Alignment, Button, ControlGroup, InputGroup, Intent, Menu, MenuItem, Spinner } from '@blueprintjs/core'
import { IItemListRendererProps, Suggest } from '@blueprintjs/select';
import { Entity, Schema } from '@alephdata/followthemoney'
import { GraphContext, IGraphContext } from '../GraphContext'
import { VertexSchemaSelect } from '../editor'
import { SchemaIcon } from '../types';
import { Point } from '../layout'
import Dialog from './Dialog'
import c from 'classnames';

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
  getEntitySuggestions: (queryText: string, schema?: Schema) => Promise<Entity[]>,
}

interface IVertexCreateDialogState {
  query: string,
  isProcessing: boolean,
  isFetchingSuggestions: boolean,
  schema?: Schema
  suggestions: Entity[],
}

export class VertexCreateDialogBase extends React.Component<IVertexCreateDialogProps, IVertexCreateDialogState> {
  static contextType = GraphContext;
  context!: React.ContextType<typeof GraphContext>;
  state: IVertexCreateDialogState = {
    query: '',
    isFetchingSuggestions: false,
    isProcessing: false,
    suggestions: [],
  }

  constructor(props: any) {
    super(props);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.onSchemaSelect = this.onSchemaSelect.bind(this);
    this.itemListRenderer = this.itemListRenderer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps: IVertexCreateDialogProps) {
    const schema = this.props.vertexCreateOptions?.initialSchema;
    if (schema && prevProps.vertexCreateOptions?.initialSchema !== schema) {
      this.setState({
        schema,
      })
    }
  }

  async onQueryChange(query: string) {
    const { schema } = this.state;
    this.setState({ isFetchingSuggestions: true });
    console.log('in on query change', query);
    const suggestions = await this.props.getEntitySuggestions(query, schema);
    console.log('suggestions are', suggestions);
    this.setState({ query, suggestions, isFetchingSuggestions: false });
  }

  async onSchemaSelect(schema: Schema) {
    const { query } = this.state;
    this.setState({ isFetchingSuggestions: true });
    console.log('in on schema change', schema);
    const suggestions = await this.props.getEntitySuggestions(query, schema);
    console.log('suggestions are', suggestions);
    this.setState({ schema, suggestions, isFetchingSuggestions: false });
  }

  getSchema(): Schema {
    const { layout } = this.context as IGraphContext
    return this.state.schema || layout.entityManager.model.getSchema('Person')
  }

  onSchemaSelect(schema: Schema) {
    this.setState({ schema })
  }

  async onSubmit(entityData: string | Entity) {
    const { layout, updateLayout, viewport, updateViewport } = this.context as IGraphContext
    const { query } = this.state
    const position = this.props.vertexCreateOptions?.initialPosition || viewport.center;
    const schema = this.getSchema();
    let entity;

    this.setState({ isProcessing: true });

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

    const vertex = layout.getVertexByEntity(entity)
    if (vertex) {
      layout.vertices.set(vertex.id, vertex.snapPosition(position))
      layout.selectElement(vertex)
      updateLayout(layout, { created: [entity] }, { modifyHistory: true, clearSearch: true });
      this.setState({query: '', isProcessing: false, suggestions: []})
      this.props.toggleDialog()
    }
  }

  checkValid(): boolean {
    // const { label } = this.state;
    // if (label.trim().length < 1) {
    //   return false;
    // }
    return true;
  }

  itemListRenderer({ activeItem, filteredItems, items, itemsParentRef, query, renderItem }: IItemListRendererProps<Entity>) {
    const { isFetchingSuggestions } = this.state;

    if (isFetchingSuggestions) {
      return <Spinner />;
    }
    return (
      <Menu ulRef={itemsParentRef}>
        {filteredItems.map(renderItem)}
      </Menu>
    );
  }

  render() {
    const { intl, layout } = this.context as IGraphContext
    const { isOpen, toggleDialog } = this.props;
    const { isProcessing, query, suggestions } = this.state;
    const schema = this.getSchema()
    const placeholder = intl.formatMessage(messages.name_placeholder, { schema: schema.label });
    const isValid = this.checkValid()
    const vertexSelectText = schema ? schema.label : intl.formatMessage(messages.type_placeholder);
    const vertexSelectIcon = schema ? SchemaIcon.get(schema) : 'select'

    return (
      <Dialog
        icon="new-object"
        isOpen={isOpen}
        isProcessing={isProcessing}
        title={intl.formatMessage(messages.title)}
        onClose={toggleDialog}
      >
        <form onSubmit={() => this.onSubmit(query)}>
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
                  rightIcon='double-caret-vertical'
                />
              </VertexSchemaSelect>
              <Suggest
                fill
                inputValueRenderer={entity => entity.getCaption()}
                items={suggestions}
                itemListRenderer={this.itemListRenderer}
                itemRenderer={(entity, { handleClick, modifiers }) => (
                  <MenuItem
                    active={modifiers.active}
                    disabled={modifiers.disabled}
                    key={entity.id}
                    onClick={handleClick}
                    text={entity.getCaption()}
                  />
                )}
                inputProps={{ large: true }}
                popoverProps={{ minimal: true }}
                onQueryChange={this.onQueryChange}
                onItemSelect={this.onSubmit}
              />
            </ControlGroup>
          </div>
        </form>
      </Dialog>
    );
  }
}

export const VertexCreateDialog = injectIntl(VertexCreateDialogBase);
