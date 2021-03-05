import * as React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { Alignment, Button, ControlGroup, InputGroup } from '@blueprintjs/core'
import { Entity, Schema as FTMSchema, Values } from '@alephdata/followthemoney'

import { IEntityContext } from 'contexts';
import { EntitySuggest, SchemaSelect } from 'editors'
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
  entityContext: IEntityContext
}

interface IEntityCreateDialogState {
  inputText: string,
  isProcessing: boolean,
  schema: FTMSchema
}

class EntityCreateDialogBase extends React.Component<IEntityCreateDialogProps & PropsFromRedux, IEntityCreateDialogState> {
  constructor(props: IEntityCreateDialogProps & PropsFromRedux) {
    super(props);

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onSchemaSelect = this.onSchemaSelect.bind(this);
    this.onInputSubmit = this.onInputSubmit.bind(this);
    this.onSelectSubmit = this.onSelectSubmit.bind(this);

    this.state = {
      inputText: '',
      isProcessing: false,
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
    }
  }

  onSchemaSelect(schema: FTMSchema) {
    this.setState({ schema });
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
    this.setState({inputText: '', isProcessing: false })
    this.props.toggleDialog();
  }

  async onSelectSubmit(values: Values) {
    const { onSubmit } = this.props;
    if (values && values.length) {
      this.setState({ isProcessing: true });
      await onSubmit(values[0]);
      this.setState({inputText: '', isProcessing: false })
      this.props.toggleDialog();
    }
  }

  render() {
    const { intl, isOpen, model, entityContext, toggleDialog } = this.props;
    const { isProcessing, inputText, schema } = this.state;
    const captionProperty = this.getCaptionProperty();
    const placeholder = `${schema.label} ${captionProperty}`;
    const vertexSelectText = schema ? schema.label : intl.formatMessage(messages.type_placeholder);
    const vertexSelectIcon = schema ? <Schema.Icon schema={schema} /> : 'select';
    const hasSuggest = !!entityContext.queryEntitySuggest;

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
          !hasSuggest && inputText.length && this.onInputSubmit()
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
              {hasSuggest && (
                <EntitySuggest
                  onSubmit={this.onSelectSubmit}
                  onQueryChange={this.onQueryChange}
                  queryText={inputText}
                  schemata={[schema]}
                  entityContext={entityContext}
                  entitySelectProps={{
                    placeholder,
                    noResultsText: intl.formatMessage(messages.no_results),
                    allowMultiple: true,
                    popoverProps: { usePortal: false },
                    inputProps: { large: true },
                    values: []
                  }}
                />
              )}
              {!hasSuggest && (
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

const mapStateToProps = (state: any, ownProps: IEntityCreateDialogProps) => {
  const { entityContext } = ownProps;
  return ({
    model: entityContext.selectModel(state),
  });
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export const EntityCreateDialog = connector(
  injectIntl(EntityCreateDialogBase)
);
