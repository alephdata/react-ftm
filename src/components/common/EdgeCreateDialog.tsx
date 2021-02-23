import * as React from 'react'
import { compose } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { FormGroup, Intent, Button } from '@blueprintjs/core'
import { Entity, Model, Schema, Values } from '@alephdata/followthemoney'

import { IEntityContext } from 'contexts/EntityContext';
import { EdgeTypeSelect, EntitySuggest } from 'editors'
import { EdgeType } from 'types'
import { Dialog } from 'components/common'

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

interface IEdgeCreateDialogProps extends WrappedComponentProps {
  source: Entity
  target?: Entity
  isOpen: boolean,
  toggleDialog: () => any
  onSubmit: (source: Entity, target: Entity, type: EdgeType) => void
  entityContext: IEntityContext
}

interface IEdgeCreateDialogState {
  sourceQueryText: string
  targetQueryText: string
  source?: Entity
  target?: Entity
  type?: EdgeType
  isProcessing: boolean
}

class EdgeCreateDialogBase extends React.Component<IEdgeCreateDialogProps & PropsFromRedux, IEdgeCreateDialogState> {
  types: EdgeType[] = []
  state: IEdgeCreateDialogState = {
    isProcessing: false,
    sourceQueryText: '',
    targetQueryText: ''
  }

  constructor(props: IEdgeCreateDialogProps & PropsFromRedux) {
    super(props)

    this.types = EdgeType.getAll(props.model)

    this.onSelectSource = this.onSelectSource.bind(this)
    this.onSelectTarget = this.onSelectTarget.bind(this)
    this.onChangeType = this.onChangeType.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onReverse = this.onReverse.bind(this)
  }

  componentDidUpdate(prevProps: IEdgeCreateDialogProps) {
    const { isOpen, source, target } = this.props;
    if (!prevProps.isOpen && isOpen) {
      this.setState({ source, target, type: undefined });
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
    this.setState(({ target }) => ({
      source,
      target: target?.id === source.id ? undefined : target,
      type: undefined
    }))
  }

  onSelectTarget(target: Entity) {
    this.setState(({ source }) => ({
      target,
      source: source?.id === target.id ? undefined : source,
      type: undefined
    }))
  }

  isValid() {
    const { source, target, type } = this.state
    return source && target && type && type.match(source, target)
  }

  async onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    const { onSubmit, toggleDialog } = this.props
    const { source, target, type } = this.state
    e.preventDefault()
    if (source && target && type && this.isValid()) {
      onSubmit(source, target, type);
      toggleDialog();
    }
  }

  isReversible() {
    const { source, target, type } = this.state
    return source && target && type && type.match(target, source)
  }

  onReverse() {
    const { source, target } = this.state
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

  render() {
    const { entityContext, intl, isOpen, suggestionSchemata, toggleDialog } = this.props
    const { isProcessing, source, target, type, sourceQueryText, targetQueryText } = this.state
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
                  <EntitySuggest
                    onSubmit={(selected: Array<Entity>) => this.onSelectSource(selected?.[0])}
                    onQueryChange={(query: string) => this.setState({ sourceQueryText: query })}
                    queryText={sourceQueryText}
                    schemata={suggestionSchemata}
                    entityContext={entityContext}
                    suggestLocalEntities={true}
                    entitySelectProps={{
                      values: source ? [source] : [],
                      allowMultiple: false
                    }}
                  />
                </FormGroup>
              </div>
              <div style={{flexGrow: 1, flexShrink: 1, flexBasis: 'auto', paddingRight: '1em'}}>
                <FormGroup label={intl.formatMessage(messages.type)} helperText={this.getTypeDescription()}>
                  <EdgeTypeSelect
                    items={types}
                    value={type}
                    onChange={this.onChangeType}
                    placeholder={intl.formatMessage(messages.type_select)}
                  />
                </FormGroup>
              </div>
              <div style={{flexGrow: 1, flexShrink: 1, flexBasis: 'auto', paddingRight: '1em'}}>
                <FormGroup label={intl.formatMessage(messages.target)} helperText={this.getTargetLabel()}>
                  <EntitySuggest
                    onSubmit={(selected: Array<Entity>) => this.onSelectTarget(selected?.[0])}
                    onQueryChange={(query: string) => this.setState({ targetQueryText: query })}
                    queryText={targetQueryText}
                    schemata={suggestionSchemata}
                    entityContext={entityContext}
                    suggestLocalEntities={true}
                    entitySelectProps={{
                      values: target ? [target] : [],
                      allowMultiple: false
                    }}
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

const mapStateToProps = (state: any, ownProps: IEdgeCreateDialogProps) => {
  const { entityContext } = ownProps;
  const model = entityContext.selectModel(state);
  return ({
    model,
    suggestionSchemata: model.getSchemata()
      .filter((schema: Schema) => schema.isThing() && !schema.generated && !schema.abstract)
  });
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export const EdgeCreateDialog = connector(
  injectIntl(EdgeCreateDialogBase)
);
