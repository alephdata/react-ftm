import * as React from 'react'
import { defineMessages } from 'react-intl';

import { Menu, MenuItem, FormGroup, Intent, Button, Alignment, Position } from '@blueprintjs/core'
import { Select, IItemListRendererProps, IItemRendererProps } from '@blueprintjs/select';
import { IGraphContext } from '../GraphContext'
import { EdgeType, VertexSelect } from '../editor/'
import { Vertex,Edge } from '../layout';
import { SchemaIcon } from '../types';
import { partition } from '../utils';

import Dialog from './Dialog';

const messages = defineMessages({
  add_link: {
    id: 'dialog.edge_create.title',
    defaultMessage: 'Add link',
  },
  source: {
    id: 'dialog.edge_create.source_label',
    defaultMessage: 'Source',
  },
  target: {
    id: 'dialog.edge_create.target_label',
    defaultMessage: 'Target',
  },
  type: {
    id: 'dialog.edge_create.type_label',
    defaultMessage: 'Type',
  },
  type_select: {
    id: 'dialog.edge_create.type_placeholder',
    defaultMessage: 'Select type',
  },
  submit: {
    id: 'dialog.edge_create.submit',
    defaultMessage: 'Create',
  },
});

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
  isProcessing: boolean
}

export class EdgeCreateDialog extends React.Component<IEdgeCreateDialogProps, IEdgeCreateDialogState> {
  types: EdgeType[] = []
  state: IEdgeCreateDialogState = {
    isProcessing: false,
  }

  constructor(props: any) {
    super(props)
    this.onSelectSource = this.onSelectSource.bind(this)
    this.onSelectTarget = this.onSelectTarget.bind(this)
    this.onChangeType = this.onChangeType.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onReverse = this.onReverse.bind(this)
  }

  static getEdgeTypeIcon(type?: EdgeType) {
    if (type && type.schema) {
      return SchemaIcon.get(type.schema)
    }
    return 'link'
  }

  componentDidMount() {
    const { layout, source, target } = this.props
    this.setState({ source, target })
    this.types = EdgeType.getAll(layout.entityManager.model)
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
      if (!type.match(source, target) && type.match(target, source)) {
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

  isValid() {
    const { source, target, type } = this.state
    return source && target && type && type.match(source, target)
  }

  async onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    const { layout, viewport, updateLayout, updateViewport, toggleDialog } = this.props
    const { source, target, type } = this.state
    const entityChanges: any = {} ;
    e.preventDefault()
    if (source && target && type && this.isValid()) {
      this.setState({ isProcessing: true });
      const sourceEntity = source.getEntity()
      const targetEntity = target.getEntity()
      if (type.property && sourceEntity) {
        const value = targetEntity || target.label
        sourceEntity.setProperty(type.property, value)
        layout.updateEntity(sourceEntity);
        entityChanges.updated = [sourceEntity]
        const edge = Edge.fromValue(layout, type.property, source, target)
        layout.selectElement(edge)
        updateViewport(viewport.setCenter(edge.getCenter()), {animate:true})
      }
      if (type.schema && type.schema.edge && sourceEntity && targetEntity) {
        const entity = await layout.createEntity({
          schema: type.schema,
          properties: {
            [type.schema.edge.source]: sourceEntity.id,
            [type.schema.edge.target]: targetEntity.id,
          }
        });
        const edge = Edge.fromEntity(layout, entity, source, target)
        layout.selectElement(edge)
        entityChanges.created = [entity];
      }
      updateLayout(layout, entityChanges, { modifyHistory: true, clearSearch: true });
      this.setState({ isProcessing: false });
      toggleDialog()
    }
  }

  isReversible() {
    const { source, target, type } = this.state
    return source && target && type && type.match(target, source)
  }

  onReverse() {
    const { source, target, type } = this.state
    if (this.isReversible()) {
      this.setState({ source: target, target: source })
    }
  }

  getTypes(): EdgeType[] {
    const { source, target } = this.state
    if (source && target) {
      return this.types.filter((et) => et.match(source, target) || et.match(target, source))
    }
    return []
  }

  getVertices(include?: Vertex, except?: Vertex): Vertex[] {
    const { layout } = this.props
    return layout.getVertices()
      .filter((vertex) => {
        const isInclude = include ? include.id === vertex.id : false
        const isExcept = except ? except.id === vertex.id : false
        return vertex.isEntity() && (isInclude || !(isExcept || vertex.isHidden()));
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

  renderEdgeTypeList(props: IItemListRendererProps<EdgeType>) {
    const { items, itemsParentRef, renderItem } = props;
    const [propertyEdgeTypes, entityEdgeTypes] = partition(
      items,
      (et: EdgeType) => et.isPropertyEdgeType()
    );
    return (
      <Menu ulRef={itemsParentRef}>
        {entityEdgeTypes.map(renderItem)}
        <Menu.Divider />
        {propertyEdgeTypes.map(renderItem)}
      </Menu>
    );
  }

  renderEdgeType(type: EdgeType, { handleClick, modifiers }:IItemRendererProps) {
    return <MenuItem
      active={modifiers.active}
      key={type.key}
      text={type.label}
      icon={EdgeCreateDialog.getEdgeTypeIcon(type)}
      onClick={handleClick}
    />
  }

  render() {
    const { intl, isOpen, toggleDialog } = this.props
    const { isProcessing, source, target, type } = this.state
    const types = this.getTypes()

    return (
      <Dialog
        icon="new-link"
        isOpen={isOpen}
        isProcessing={isProcessing}
        title={intl.formatMessage(messages.add_link)}
        onClose={toggleDialog}
        className="large"
      >
        <form onSubmit={this.onSubmit}>
          <div className="bp3-dialog-body">
            <div style={{flex: 1, display: 'flex', flexFlow: 'row'}}>
              <div style={{flexGrow: 1, flexShrink: 1, flexBasis: 'auto', paddingRight: '1em'}}>
                <FormGroup label={intl.formatMessage(messages.source)} helperText={this.getSourceLabel()}>
                  <VertexSelect
                    vertices={this.getVertices(source, target)}
                    vertex={source}
                    onSelect={this.onSelectSource}
                  />
                </FormGroup>
              </div>
              <div style={{flexGrow: 1, flexShrink: 1, flexBasis: 'auto', paddingRight: '1em'}}>
                <FormGroup label={intl.formatMessage(messages.type)} helperText={this.getTypeDescription()}>
                  <EdgeTypeSelect
                    popoverProps={{
                      position: Position.BOTTOM_LEFT,
                      minimal: true,
                      targetProps: {style: {width: '100%'}}
                    }}
                    filterable={false}
                    items={types}
                    itemListRenderer={this.renderEdgeTypeList}
                    itemRenderer={this.renderEdgeType}
                    onItemSelect={this.onChangeType}
                  >
                    <Button fill
                      disabled={!types.length}
                      text={type ? type.label : intl.formatMessage(messages.type_select)}
                      alignText={Alignment.LEFT}
                      icon={EdgeCreateDialog.getEdgeTypeIcon(type)}
                      rightIcon='double-caret-vertical'
                    />
                  </EdgeTypeSelect>
                </FormGroup>
              </div>
              <div style={{flexGrow: 1, flexShrink: 1, flexBasis: 'auto', paddingRight: '1em'}}>
                <FormGroup label={intl.formatMessage(messages.target)} helperText={this.getTargetLabel()}>
                  <VertexSelect
                    vertices={this.getVertices(target, source)}
                    vertex={target}
                    onSelect={this.onSelectTarget}
                  />
                </FormGroup>
              </div>
              <div style={{flexGrow: 0, flexShrink: 1, flexBasis: '1%'}}>
                <FormGroup label='&nbsp;'>
                  <Button
                    onClick={this.onReverse}
                    disabled={!this.isReversible()}
                    icon="exchange"
                  />
                </FormGroup>
              </div>
            </div>
          </div>
          <div className="bp3-dialog-footer">
            <div className="bp3-dialog-footer-actions">
              <Button
                intent={Intent.PRIMARY}
                disabled={!this.isValid()}
                text={intl.formatMessage(messages.submit)}
                type="submit"
              />
            </div>
          </div>
        </form>
      </Dialog>
    );
  }
}
