import * as React from 'react'
import { defineMessages, WrappedComponentProps } from 'react-intl';
import _ from 'lodash';
import { Menu, MenuItem, FormGroup, Icon, Intent, Button, Alignment, Position } from '@blueprintjs/core'
import { Select, IItemListRendererProps, IItemRendererProps } from '@blueprintjs/select';
import { Entity } from '@alephdata/followthemoney'

import { EntitySelect } from '../editors'
import { EdgeType } from '../components'
import { IGraphContext } from '../GraphContext'
import { EntityManager } from '../EntityManager'
import { Schema } from '../types';

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

interface IEdgeCreateDialogProps extends WrappedComponentProps {
  source: Entity
  target?: Entity
  isOpen: boolean,
  toggleDialog: () => any
  entityManager: EntityManager
}

interface IEdgeCreateDialogState {
  source?: Entity
  target?: Entity
  sourceSuggestions: any
  targetSuggestions: any
  type?: EdgeType
  isProcessing: boolean
}

export class EdgeCreateDialog extends React.Component<IEdgeCreateDialogProps, IEdgeCreateDialogState> {
  types: EdgeType[] = []
  state: IEdgeCreateDialogState = {
    isProcessing: false,
    sourceSuggestions: { isPending: false, results: [] },
    targetSuggestions: { isPending: false, results: [] },
  }

  constructor(props: any) {
    super(props)
    this.onSelectSource = this.onSelectSource.bind(this)
    this.onSelectTarget = this.onSelectTarget.bind(this)
    this.onChangeType = this.onChangeType.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onReverse = this.onReverse.bind(this)
    this.renderEdgeType = this.renderEdgeType.bind(this)
  }


  componentDidMount() {
    const { entityManager, source, target } = this.props
    this.setState({ source, target })
    this.types = EdgeType.getAll(entityManager.model)
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

  onSelectSource(source: Entity) {
    this.setState({ source, type: undefined })
  }

  onSelectTarget(target: Entity) {
    this.setState({ target, type: undefined })
  }

  isValid() {
    const { source, target, type } = this.state
    return source && target && type && type.match(source, target)
  }

  async onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    const { onSubmit } = this.props
    const { source, target, type } = this.state
    e.preventDefault()
    if (source && target && type && this.isValid()) {
      onSubmit({ source, target, type});
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

  getEdgeTypeIcon(type?: EdgeType) {
    if (type?.schema) {
      return <Schema.Icon schema={type.schema} />
    } else {
      return <Icon icon="link" />
    }
  }

  renderEdgeTypeList(props: IItemListRendererProps<EdgeType>) {
    const { items, itemsParentRef, renderItem } = props;
    const [propertyEdgeTypes, entityEdgeTypes] = _.partition(
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
      icon={this.getEdgeTypeIcon(type)}
      onClick={handleClick}
    />
  }

  async fetchEntitySuggestions(query: string, which?: string) {
    const stateKey = `${which}Suggestions`;

    console.log('fetching', query, which);

    const { entityManager } = this.props;
    this.setState({ [stateKey]: { isProcessing: true, results: [] } });
    const results = await entityManager.getEntitySuggestions(query, ['Thing']);
    console.log('results', which, results);
    this.setState({ [stateKey]: { isProcessing: false, results } });
  }

  render() {
    const { intl, isOpen, toggleDialog } = this.props
    const { isProcessing, source, target, type, sourceSuggestions, targetSuggestions } = this.state
    const types = this.getTypes()

    return (
      <Dialog
        icon="new-link"
        isOpen={isOpen}
        isProcessing={isProcessing}
        title={intl.formatMessage(messages.add_link)}
        onClose={() => toggleDialog()}
        className="large"
      >
        <form onSubmit={this.onSubmit}>
          <div className="bp3-dialog-body">
            <div style={{flex: 1, display: 'flex', flexFlow: 'row'}}>
              <div style={{flexGrow: 1, flexShrink: 1, flexBasis: 'auto', paddingRight: '1em'}}>
                <FormGroup label={intl.formatMessage(messages.source)} helperText={this.getSourceLabel()}>
                  <EntitySelect
                    onSubmit={(selected: Array<Entity>) => this.onSelectSource(selected?.[0])}
                    onChange={(selected: Array<Entity>) => this.onSelectSource(selected?.[0])}
                    values={source ? [source] : []}
                    allowMultiple={false}
                    isFetching={sourceSuggestions.isPending}
                    entitySuggestions={sourceSuggestions.results}
                    onQueryChange={(query) => this.fetchEntitySuggestions(query, 'source')}
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
                      icon={this.getEdgeTypeIcon(type)}
                      rightIcon='double-caret-vertical'
                    />
                  </EdgeTypeSelect>
                </FormGroup>
              </div>
              <div style={{flexGrow: 1, flexShrink: 1, flexBasis: 'auto', paddingRight: '1em'}}>
                <FormGroup label={intl.formatMessage(messages.target)} helperText={this.getTargetLabel()}>
                  <EntitySelect
                    onSubmit={(selected: Array<Entity>) => this.onSelectTarget(selected?.[0])}
                    onChange={(selected: Array<Entity>) => this.onSelectTarget(selected?.[0])}
                    values={target ? [target] : []}
                    allowMultiple={false}
                    isFetching={targetSuggestions.isPending}
                    entitySuggestions={targetSuggestions.results}
                    onQueryChange={(query) => this.fetchEntitySuggestions(query, 'target')}
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
