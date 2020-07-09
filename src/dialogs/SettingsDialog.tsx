import * as React from 'react';
import _ from 'lodash';
import { defineMessages, FormattedMessage, WrappedComponentProps } from 'react-intl';
import { Intent, ControlGroup, InputGroup, Colors, Checkbox } from '@blueprintjs/core'

import { GraphContext, IGraphContext } from '../GraphContext'
import { ColorPicker } from '../editors';
import EntityManager from '../';

import Dialog from './Dialog';

import { Point, Grouping } from '../layout'

import './SettingsDialog.scss';

const messages = defineMessages({
  title: {
    id: 'dialog.settings.title',
    defaultMessage: 'Settings',
  },
  // placeholder: {
  //   id: 'dialog.settings.placeholder',
  //   defaultMessage: 'Select a label for the grouping',
  // },
});

interface ISettingsDialogProps extends WrappedComponentProps {
  isOpen: boolean
  toggleDialog: () => any
  entityManager: EntityManager
}

interface ISettingsDialogState {
  pivotTypes: Array<string>
}

export class SettingsDialog extends React.Component<ISettingsDialogProps, ISettingsDialogState> {
  constructor(props: any) {
    super(props);

    this.state = {};
    this.renderCheckbox = this.renderCheckbox.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.entityManager.pivotTypes !== prevState.pivotTypes) {
      return {
        pivotTypes: nextProps.entityManager.pivotTypes,
      };
    }
    return {};
  }

  renderCheckbox(type) {
    const { entityManager, isOpen, toggleDialog } = this.props;
    const { pivotTypes } = this.state;

    const isSelected = pivotTypes.includes(type.name);
    return (
      <Checkbox
        checked={isSelected}
        label={type.label}
        onChange={() => {
          const nextPivotTypes = entityManager.togglePivotType(type.name);
          this.setState({ pivotTypes: nextPivotTypes });
        }
      />
    );
  }

  render() {
    const { intl, isOpen, entityManager, toggleDialog } = this.props;

    const typeOptions = _.sortBy(Object.values(entityManager.model.types), ['label']);

    return (
      <Dialog
        icon="cog"
        isOpen={isOpen}
        title={intl.formatMessage(messages.title)}
        onClose={() => toggleDialog()}
        className="SettingsDialog"
      >
        <form onSubmit={this.onSubmit}>
          <div className="bp3-dialog-body">
            <div className="SettingsDialog__section">
              <h5 className="SettingsDialog__section__title">
                <FormattedMessage
                  id="dialog.settings.pivot_types.title"
                  defaultMessage="Select properties to connect"
                />
              </h5>
              <div className="SettingsDialog__type-select">
                {typeOptions.map(this.renderCheckbox)}
              </div>
            </div>
          </div>
        </form>
      </Dialog>
    );
  }
}
