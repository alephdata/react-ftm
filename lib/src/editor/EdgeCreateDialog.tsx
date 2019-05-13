import * as React from 'react'
import { Dialog, Menu, MenuItem, FormGroup, Intent, Button, ControlGroup, InputGroup } from '@blueprintjs/core'
import { Model, Schema, Property, IconRegistry } from '@alephdata/followthemoney'
import { GraphContext, IGraphContext } from '../GraphContext'


interface IEdgeCreateDialogProps {
  isOpen: boolean,
  toggleDialog: () => any
}

interface IEdgeCreateDialogState {
  label: string,
  schema?: Schema
}

export class EdgeType {
  public schema?: Schema
  public property?: Property

  constructor(schema?: Schema, property?: Property) {
    this.schema = schema
    this.property = property
  }

  static getAll(model: Model): EdgeType[] {
    const types = new Array<EdgeType>()
    if (model.schemata) {
      model.schemata.forEach((schema) => {
        types.push(new EdgeType(schema))
      })
    }
    
    return types
  }
}


export class EdgeCreateDialog extends React.Component<IEdgeCreateDialogProps, IEdgeCreateDialogState> {
  static contextType = GraphContext;
  context!: React.ContextType<typeof GraphContext>;
  state: IEdgeCreateDialogState = {
    label: ''
  }

  constructor(props: any) {
    super(props);
    // this.onChangeLabel = this.onChangeLabel.bind(this);
    // this.onSchemaSelect = this.onSchemaSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // onChangeLabel(e: React.ChangeEvent<HTMLInputElement>) {
  //   this.setState({ label: e.target.value })
  // }

  // getSchema(): Schema {
  //   const { layout } = this.context as IGraphContext
  //   return this.state.schema || layout.model.getSchema('Person')
  // }

  // onSchemaSelect(schema: Schema) {
  //   this.setState({ schema })
  // }

  onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    // const { label } = this.state
    // const schema = this.getSchema()
    // const { layout, updateLayout } = this.context as IGraphContext
    e.preventDefault()
    // if (this.checkValid()) {
    //   const entity = layout.model.createEntity(schema)
    //   entity.setProperty('name', label)
    //   layout.addEntity(entity)
    //   layout.layout()
    //   const vertex = layout.getVertexByEntity(entity)
    //   if (vertex) {
    //     layout.selectVertex(vertex)
    //     layout.viewport = layout.viewport.setCenter(vertex.position)
    //     updateLayout(layout)
    //     this.setState({label: ''})
    //     this.props.toggleDialog()
    //   }
    // }
  }

  // checkValid(): boolean {
  //   const { label } = this.state;
  //   if (label.trim().length < 3) {
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    // const { layout } = this.context as IGraphContext
    const { isOpen, toggleDialog } = this.props
    // const schema = this.getSchema()
    // const placeholder = `${schema.label} name`
    // const isValid = this.checkValid()
    return (
      <Dialog icon="new-link" isOpen={isOpen} title="Add connection" onClose={toggleDialog}>
        <form onSubmit={this.onSubmit}>
          {/* <div className="bp3-dialog-body">
            <ControlGroup fill>
              <VertexSchemaSelect
                model={layout.model}
                schema={schema}
                onSelect={this.onSchemaSelect}
              />
              <InputGroup
                large
                intent={isValid ? undefined : Intent.WARNING}
                className="bp3-fill"
                value={this.state.label}
                onChange={this.onChangeLabel}
                placeholder={placeholder}
              />
            </ControlGroup>
          </div> */}
        </form>
      </Dialog>
    );
  }
}
