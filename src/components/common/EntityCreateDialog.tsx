import * as React from 'react'
import { defineMessages, WrappedComponentProps } from 'react-intl';
import { Alignment, Button, ControlGroup, InputGroup } from '@blueprintjs/core'
import { Entity, Model, Schema as FTMSchema, Values } from '@alephdata/followthemoney'

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

interface IEntityCreateDialogProps extends WrappedComponentProps {
  isOpen: boolean,
  onSubmit: (entityData: any) => Promise<Entity | undefined>,
  toggleDialog: () => any,
  schema: FTMSchema,
  model: Model
  fetchEntitySuggestions?: (queryText: string, schemata?: Array<FTMSchema>) => Promise<Entity[]>,
}

interface IEntityCreateDialogState {
  inputText: string,
  isProcessing: boolean,
  isFetchingSuggestions: boolean,
  schema: FTMSchema
  suggestions: Entity[],
}

export class EntityCreateDialog extends React.Component<IEntityCreateDialogProps, IEntityCreateDialogState> {
  constructor(props: any) {
    super(props);

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onSchemaSelect = this.onSchemaSelect.bind(this);
    this.onInputSubmit = this.onInputSubmit.bind(this);
    this.onSelectSubmit = this.onSelectSubmit.bind(this);

    this.state = {
      inputText: '',
      isFetchingSuggestions: false,
      isProcessing: false,
      suggestions: [],
      schema: props.schema
    };
  }

  componentDidUpdate(prevProps: IEntityCreateDialogProps) {
    const { isOpen, schema } = this.props;
    if (!prevProps.isOpen && isOpen) {
      this.setState({ schema });
    }
  }

  onQueryChange(inputText: string) {
    if (!this.state.isProcessing) {
      this.setState({ inputText });
      this.fetchSuggestions(inputText, [this.state.schema])
    }
  }

  onSchemaSelect(schema: FTMSchema) {
    this.setState({ schema });
    this.fetchSuggestions(this.state.inputText, [schema])
  }

  async fetchSuggestions(inputText: string, schemata: Array<FTMSchema>) {
    const { fetchEntitySuggestions } = this.props;
    if (fetchEntitySuggestions) {
      this.setState({ isFetchingSuggestions: true });
      const suggestions = await fetchEntitySuggestions(inputText, schemata);
      this.setState({ isFetchingSuggestions: false, suggestions });
    }
  }

  getCaptionProperty() {
    return this.state.schema?.caption[0];
  }

  async onInputSubmit() {
    this.setState({ isProcessing: true });
    const { onSubmit } = this.props;
    const { inputText, schema } = this.state;
    const captionProperty = this.getCaptionProperty();
    const entityData = {
      schema,
      properties: captionProperty && { [captionProperty]: inputText }
    }
    await onSubmit(entityData);
    this.setState({inputText: '', isProcessing: false, suggestions: []})
    this.props.toggleDialog();
  }

  async onSelectSubmit(values: Values) {
    const { onSubmit } = this.props;
    if (values && values.length) {
      this.setState({ isProcessing: true });
      await onSubmit(values[0]);
      this.setState({inputText: '', isProcessing: false, suggestions: []})
      this.props.toggleDialog();
    }
  }

  render() {
    const { fetchEntitySuggestions, intl, isOpen, model, toggleDialog } = this.props;
    const { isFetchingSuggestions, isProcessing, inputText, schema, suggestions } = this.state;
    const captionProperty = this.getCaptionProperty();
    const placeholder = `${schema.label} ${captionProperty}`;
    const vertexSelectText = schema ? schema.label : intl.formatMessage(messages.type_placeholder);
    const vertexSelectIcon = schema ? <Schema.Icon schema={schema} /> : 'select';

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
          !suggestions.length && inputText.length && this.onInputSubmit()
        }}>
          <div className="bp3-dialog-body">
            <ControlGroup fill>
              <SchemaSelect
                model={model}
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
              {fetchEntitySuggestions && (
                <EntitySelect
                  onSubmit={this.onSelectSubmit}
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
              {!fetchEntitySuggestions && (
                <InputGroup
                  autoFocus
                  large
                  fill
                  placeholder={placeholder}
                  value={inputText}
                  onChange={(e: any) => this.onQueryChange(e.target.value)}
                />
              )}
              <Button
                large
                icon="arrow-right"
                disabled={!inputText.length}
                onClick={this.onInputSubmit}
                className="EntityCreateDialog__submit"
              />
            </ControlGroup>
          </div>
        </form>
      </Dialog>
    );
  }
}
