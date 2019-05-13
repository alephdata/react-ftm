import * as React from 'react'
import { Dialog, Menu, MenuItem } from '@blueprintjs/core'
import { Schema, IconRegistry } from '@alephdata/followthemoney'
import { GraphContext, IGraphContext } from '../GraphContext'


interface IVertexCreateDialogProps {
  isOpen: boolean,
  toggleDialog: () => any
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
  }

  onChangeLabel(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ label: e.target.value })
  }

  onSchemaSelect(schema: Schema) {
    const { label } = this.state
    const { layout, updateLayout } = this.context as IGraphContext
    if (this.checkValid()) {
      const entity = layout.model.createEntity(schema)
      entity.setProperty('name', label)
      layout.addEntity(entity)
      layout.layout()
      const vertex = layout.getVertexByEntity(entity)
      if (vertex) {
        layout.selectVertex(vertex)
        layout.viewport = layout.viewport.setCenter(vertex.position)
        updateLayout(layout)
        this.setState({label: ''})
        this.props.toggleDialog()
      }
    }
  }

  checkValid(): boolean {
    const { label } = this.state;
    if (label.trim().length < 3) {
      return false;
    }
    return true;
  }

  getSchemata(): Schema[] {
    const { layout } = this.context as IGraphContext
    const { model } = layout
    const schemata = Object.keys(model.schemata).map((name) => model.schemata[name]) as Schema[]
    const filtered = schemata.filter((schema) => !schema.abstract && !schema.generated && !schema.isEdge)
    return filtered.sort((a, b) => a.label.localeCompare(b.label))
  }

  getIcon(schema: Schema) {
    const iconPaths = IconRegistry.getIcon(schema.name.toLowerCase());
    if (!iconPaths) {
      return null
    }
    return <svg viewBox={'0 0 24 24'} height={20} width={20}>{iconPaths
      .map((d, i) => <path key={i} d={d}/>)
    }/></svg>;
  }

  render() {
    const { isOpen, toggleDialog } = this.props;
    const { label } = this.state;
    const disabled = !this.checkValid();
    const schemata = this.getSchemata()

    return (
      <Dialog icon="new-object" isOpen={isOpen} title="Add a node" onClose={toggleDialog}>
        <div className="bp3-dialog-body">
          <div className="bp3-form-group">
            <label className="bp3-label" htmlFor="label">
              <div className="bp3-input-group bp3-large bp3-fill">
                <input
                  id="label"
                  type="text"
                  className="bp3-input"
                  placeholder="New node title"
                  autoComplete="off"
                  onChange={this.onChangeLabel}
                  value={label}
                />
              </div>
            </label>
          </div>
          <div className="bp3-form-group">
            <label className="bp3-label" htmlFor="schema">
              <div className="bp3-input-group bp3-large bp3-fill">
                <Menu>
                  {schemata.map(schema => 
                    <MenuItem
                      key={schema.name}
                      disabled={disabled}
                      icon={this.getIcon(schema)}
                      onClick={() => this.onSchemaSelect(schema)}
                      text={schema.label}
                    />
                  )}
                </Menu>
              </div>
            </label>
          </div>
        </div>
      </Dialog>
    );
  }
}
