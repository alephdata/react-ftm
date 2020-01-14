import * as React from 'react'
import { Alignment, Button, ControlGroup, Dialog, InputGroup, Intent } from '@blueprintjs/core'
import { Schema } from '@alephdata/followthemoney'
import { GraphContext, IGraphContext } from '../GraphContext'
import { VertexSchemaSelect } from './VertexSchemaSelect'
import { SchemaIcon } from '../types';
import { Point } from '../layout'

import "./VertexCreateDialog.scss";

interface IVertexCreateDialogProps {
  isOpen: boolean,
  toggleDialog: () => any,
  vertexInitialPos?: Point
}

interface IVertexCreateDialogState {
  label: string,
  schema?: Schema
}

export class VertexCreateDialog extends React.Component<IVertexCreateDialogProps, IVertexCreateDialogState> {
  static contextType = GraphContext;
  context!: React.ContextType<typeof GraphContext>;
  state: IVertexCreateDialogState = {
    label: ''
  }

  constructor(props: any) {
    super(props);
    this.onChangeLabel = this.onChangeLabel.bind(this);
    this.onSchemaSelect = this.onSchemaSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    const { vertexInitialPos } = this.props
    const { label } = this.state
    const schema = this.getSchema()
    const { layout, updateLayout, viewport, updateViewport } = this.context as IGraphContext
    e.preventDefault()
    if (this.checkValid()) {
      let entity;
      const captionProperty = schema?.caption[0];
      if (captionProperty) {
        entity = await layout.addEntity({ schema, properties: { [captionProperty]: label } });
      } else {
        entity = await layout.addEntity({ schema });
      }
      const vertex = layout.getVertexByEntity(entity)
      if (vertex) {
        vertexInitialPos && layout.vertices.set(vertex.id, vertex.setPosition(vertexInitialPos))
        layout.selectElement(vertex)
        updateLayout(layout, {modifyHistory: true, entityChanges: { created: [entity] }})
        updateViewport(viewport.setCenter(vertexInitialPos || vertex.position), {animate:true})
        this.setState({label: ''})
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
    const { layout } = this.context as IGraphContext
    const { isOpen, toggleDialog } = this.props
    const schema = this.getSchema()
    const placeholder = `${schema.label} name`
    const isValid = this.checkValid()
    const vertexSelectText = schema ? schema.label : 'pick a type';
    const vertexSelectIcon = schema ? SchemaIcon.get(schema) : 'select'
    return (
      <Dialog icon="new-object" isOpen={isOpen} title="Add entity" onClose={toggleDialog} className="VertexCreateDialog">
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
      </Dialog>
    );
  }
}
