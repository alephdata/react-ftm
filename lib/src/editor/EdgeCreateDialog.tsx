import * as React from 'react'
import { Dialog, Menu, MenuItem, FormGroup, Intent, Button, Alignment, ControlGroup, InputGroup } from '@blueprintjs/core'
import { Select, IItemRendererProps } from '@blueprintjs/select';
import { Model, Schema, Property, IconRegistry, PropertyType } from '@alephdata/followthemoney'
import { GraphContext, IGraphContext } from '../GraphContext'
import { EdgeType } from './EdgeType'

const EdgeTypeSelect = Select.ofType<EdgeType>();

interface IEdgeCreateDialogProps {
  isOpen: boolean,
  toggleDialog: () => any
}

interface IEdgeCreateDialogState {
  type?: EdgeType
}

export class EdgeCreateDialog extends React.Component<IEdgeCreateDialogProps, IEdgeCreateDialogState> {
  static contextType = GraphContext;
  context!: React.ContextType<typeof GraphContext>;
  state: IEdgeCreateDialogState = {
  }

  constructor(props: any) {
    super(props)
    this.onChangeType = this.onChangeType.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChangeType(type: EdgeType) {
    this.setState({ type })
  }

  onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  renderEdgeType(type: EdgeType, { handleClick, modifiers }: IItemRendererProps) {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    return <MenuItem
      active={modifiers.active}
      key={type.key}
      text={type.label}
      // icon={VertexSchemaSelect.getIcon(schema)}
      onClick={handleClick}
    />
  }

  render() {
    const { layout } = this.context as IGraphContext
    const { isOpen, toggleDialog } = this.props
    const vertices = layout.getSelectedVertices()
    const types = EdgeType.getMatching(layout.model, vertices)
    if (!types.length) {
      return null
    }
    console.log(types)
    const type = this.state.type || types[0]
    return (
      <Dialog icon="new-link" isOpen={isOpen} title="Add link" onClose={toggleDialog}>
        <form onSubmit={this.onSubmit}>
          <div className="bp3-dialog-body">
            <FormGroup label="Link type:">
              <EdgeTypeSelect
                filterable={false}
                items={types}
                itemRenderer={this.renderEdgeType}
                onItemSelect={this.onChangeType}
              >
                <Button
                  large
                  text={type.label}
                  alignText={Alignment.LEFT}
                  // icon={VertexSchemaSelect.getIcon(schema)}
                  rightIcon='double-caret-vertical'
                />
              </EdgeTypeSelect>
            </FormGroup>
          </div>
        </form>
      </Dialog>
    );
  }
}
