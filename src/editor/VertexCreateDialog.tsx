import * as React from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { Alignment, Button, ControlGroup, Dialog, InputGroup, Intent, Spinner } from '@blueprintjs/core'
import { Schema } from '@alephdata/followthemoney'
import { GraphContext, IGraphContext } from '../GraphContext'
import { VertexSchemaSelect } from './VertexSchemaSelect'
import { SchemaIcon } from '../types';
import { Point } from '../layout'
import c from 'classnames';

import "./VertexCreateDialog.scss";

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
}

interface IVertexCreateDialogState {
  label: string,
  isProcessing: boolean,
  schema?: Schema
}

export class VertexCreateDialogBase extends React.Component<IVertexCreateDialogProps, IVertexCreateDialogState> {
  static contextType = GraphContext;
  context!: React.ContextType<typeof GraphContext>;
  state: IVertexCreateDialogState = {
    label: '',
    isProcessing: false,
  }

  constructor(props: any) {
    super(props);
    this.onChangeLabel = this.onChangeLabel.bind(this);
    this.onSchemaSelect = this.onSchemaSelect.bind(this);
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

  onChangeLabel(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ label: e.target.value })
  }

  getSchema(): Schema {
    const { layout } = this.context as IGraphContext
    return this.state.schema || layout.entityManager.model.getSchema('Person')
  }

  onSchemaSelect(schema: Schema) {
    this.setState({ schema })
  }

  async onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    const { layout, updateLayout, viewport, updateViewport } = this.context as IGraphContext
    const { label } = this.state
    const position = this.props.vertexCreateOptions?.initialPosition || viewport.center;
    const schema = this.getSchema()
    e.preventDefault()

    if (this.checkValid()) {
      this.setState({ isProcessing: true });
      let entity;
      const captionProperty = schema?.caption[0];
      if (captionProperty) {
        entity = await layout.addEntity({ schema, properties: { [captionProperty]: label } });
      } else {
        entity = await layout.addEntity({ schema });
      }
      const vertex = layout.getVertexByEntity(entity)
      if (vertex) {
        layout.vertices.set(vertex.id, vertex.snapPosition(position))
        layout.selectElement(vertex)
        updateLayout(layout, { created: [entity] }, { modifyHistory: true, clearSearch: true });
        this.setState({label: '', isProcessing: false})
        this.props.toggleDialog()
      }
    }
  }

  checkValid(): boolean {
    const { label } = this.state;
    if (label.trim().length < 1) {
      return false;
    }
    return true;
  }

  render() {
    const { intl, layout } = this.context as IGraphContext
    const { isOpen, toggleDialog } = this.props;
    const { isProcessing } = this.state;
    const schema = this.getSchema()
    const placeholder = intl.formatMessage(messages.name_placeholder, { schema: schema.label });
    const isValid = this.checkValid()
    const vertexSelectText = schema ? schema.label : intl.formatMessage(messages.type_placeholder);
    const vertexSelectIcon = schema ? SchemaIcon.get(schema) : 'select'

    return (
      <Dialog
        icon="new-object"
        isOpen={isOpen}
        title={intl.formatMessage(messages.title)}
        onClose={toggleDialog}
        className="VertexCreateDialog"
        portalClassName="dialog-portal-container"
      >
        <div className={c('VertexCreateDialog__content', isProcessing)}>
          <form onSubmit={this.onSubmit}>
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
                <InputGroup
                  autoFocus
                  large
                  intent={isValid ? undefined : Intent.WARNING}
                  className="bp3-fill"
                  value={this.state.label}
                  onChange={this.onChangeLabel}
                  placeholder={placeholder}
                />
              </ControlGroup>
            </div>
          </form>
          {isProcessing && (
            <div className="VertexCreateDialog__loading-overlay">
              <Spinner />
            </div>
          )}
        </div>
      </Dialog>
    );
  }
}

export const VertexCreateDialog = injectIntl(VertexCreateDialogBase);
