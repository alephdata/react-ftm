import * as React from 'react'
import { Dialog, Menu, MenuItem, FormGroup, Intent, Button, Alignment, ControlGroup, InputGroup } from '@blueprintjs/core'
import { Select, IItemRendererProps } from '@blueprintjs/select';
import { Model, Schema, Property, IconRegistry, PropertyType } from '@alephdata/followthemoney'
import { GraphContext, IGraphContext } from '../GraphContext'
import { VertexSelect } from './VertexSelect'
import { EdgeType } from './EdgeType'
import { Vertex } from '../layout/Vertex';

const EdgeTypeSelect = Select.ofType<EdgeType>();

interface IEdgeCreateDialogProps extends IGraphContext {
  source: Vertex
  target?: Vertex
  isOpen: boolean,
  toggleDialog: () => any
}

interface IEdgeCreateDialogState {
  source?: Vertex
  target?: Vertex
  type?: EdgeType
}

export class EdgeCreateDialog extends React.Component<IEdgeCreateDialogProps, IEdgeCreateDialogState> {
  types: EdgeType[] = []
  state: IEdgeCreateDialogState = {}

  constructor(props: any) {
    super(props)
    this.onSelectSource = this.onSelectSource.bind(this)
    this.onSelectTarget = this.onSelectTarget.bind(this)
    this.onChangeType = this.onChangeType.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    const { layout, source, target } = this.props
    this.setState({ source, target })
    this.types = EdgeType.getAll(layout.model)
  }

  componentDidUpdate(prevProps: IEdgeCreateDialogProps) {
    if (prevProps.source !== this.props.source || prevProps.target !== this.props.target) {
      const { source, target } = this.props
      this.setState({ source, target, type: undefined })
    }
  }

  onChangeType(type: EdgeType) {
    const { source, target } = this.state
    if (source && target) {
      if (!type.matchForward(source, target) && type.matchBackward(source, target)) {
        this.setState({ source: target, target: source })
      }
      this.setState({ type })
    }
  }

  onSelectSource(source: Vertex) {
    this.setState({ source, type: undefined })
  }

  onSelectTarget(target: Vertex) {
    this.setState({ target, type: undefined })
  }

  onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  getVertices(include?: Vertex, except?: Vertex): Vertex[] {
    const { layout } = this.props
    return layout.getVertices()
      .filter((vertex) => {
        const isInclude = include ? include.id === vertex.id : false
        const isExcept = except ? except.id === vertex.id : false
        return isInclude || !(isExcept || vertex.isHidden())
      })
      .sort((a, b) => a.label.localeCompare(b.label))
  }

  getSourceLabel(): string | undefined {
    const { type } = this.state
    if (type) {
      if (type.schema && type.schema.edge) {
        return type.schema.getProperty(type.schema.edge.source).label
      }
      if (type.property) {
        return type.property.schema.label
      }
    }
    return 'Source'
  }

  getTargetLabel(): string | undefined {
    const { type } = this.state
    if (type) {
      if (type.schema && type.schema.edge) {
        return type.schema.getProperty(type.schema.edge.target).label
      }
      if (type.property) {
        return type.property.label
      }
    }
    return 'Target'
  }

  getTypeDescription(): string | undefined | null {
    const { type } = this.state
    if (type) {
      if (type.schema) {
        return type.schema.description
      }
      if (type.property) {
        return type.property.description
      }
    }
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
    const { layout, isOpen, toggleDialog } = this.props
    const { source, target, type } = this.state
    const types = (source && target) ? EdgeType.getMatching(layout.model, source, target) : []
    return (
      <Dialog icon="new-link" isOpen={isOpen} title="Add link" onClose={toggleDialog}>
        <form onSubmit={this.onSubmit}>
          <div className="bp3-dialog-body">
            <FormGroup label={this.getSourceLabel()}>
              <VertexSelect
                vertices={this.getVertices(source, target)}
                vertex={source}
                onSelect={this.onSelectSource}
              />
            </FormGroup>
            <FormGroup label={this.getTargetLabel()}>
              <VertexSelect
                vertices={this.getVertices(target, source)}
                vertex={target}
                onSelect={this.onSelectTarget}
              />
            </FormGroup>
            <FormGroup label="Link type" helperText={this.getTypeDescription()}>
              <EdgeTypeSelect
                filterable={false}
                items={types}
                itemRenderer={this.renderEdgeType}
                onItemSelect={this.onChangeType}
              >
                <Button
                  disabled={!types.length}
                  text={type ? type.label : 'Select link type'}
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
