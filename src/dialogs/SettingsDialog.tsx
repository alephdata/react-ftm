import * as React from 'react';
import _ from 'lodash';
import { Model, PropertyType } from '@alephdata/followthemoney';
import { defineMessages, FormattedMessage, WrappedComponentProps } from 'react-intl';
import { Intent, FormGroup, ControlGroup, InputGroup, Colors, Checkbox, Dialog, Button } from '@blueprintjs/core'

import { GraphContext, IGraphContext } from '../GraphContext'
import { ColorPicker } from '../editors';
import { Point, Grouping, ISettingsData, Settings } from '../layout'

import './SettingsDialog.scss';

const messages = defineMessages({
  title: {
    id: 'dialog.settings.title',
    defaultMessage: 'Settings',
  },
  submit: {
    id: 'dialog.settings.submit',
    defaultMessage: 'Save changes',
  },
  label: {
    id: 'dialog.settings.pivot_types.label',
    defaultMessage: 'Connect shared values',
  },
  helpText: {
    id: 'dialog.settings.pivot_types.help_text',
    defaultMessage: 'The selected property types above will be used to draw connections between nodes when values are shared',
  },
});

interface ISettingsDialogProps extends WrappedComponentProps {
  isOpen: boolean
  toggleDialog: (settings?: ISettingsData) => void
  model: Model
  settings: Settings
}

interface ISettingsDialogState {
  pivotTypes: Array<string>
}

export class SettingsDialog extends React.Component<ISettingsDialogProps, ISettingsDialogState> {
  constructor(props: ISettingsDialogProps) {
    super(props);

    this.state = { pivotTypes: props.settings.pivotTypes };

    this.togglePivotType = this.togglePivotType.bind(this);
  }

  togglePivotType(type: string) {
    this.setState(({ pivotTypes }) => {
      if (pivotTypes.includes(type)) {
        return ({
          pivotTypes: pivotTypes.filter(t => t !== type)
        })
      }
      return ({
        pivotTypes: [...pivotTypes, type]
      })
    });
  }


  renderPivotType = (type: PropertyType) => {
    const { isOpen, settings } = this.props;
    const { pivotTypes } = this.state;

    const isSelected = pivotTypes.includes(type.name);
    return (
      <Checkbox
        key={type.name}
        checked={isSelected}
        label={type.label}
        onChange={() => this.togglePivotType(type.name)}
      />
    );
  }

  render() {
    const { intl, isOpen, model, toggleDialog } = this.props;
    const { pivotTypes } = this.state;

    const matchableTypes = Object.values(model.types).filter(t => t.matchable);
    const typeOptions = _.sortBy(matchableTypes, ['label']);

    return (
      <Dialog
        icon="cog"
        isOpen={isOpen}
        title={intl.formatMessage(messages.title)}
        onClose={() => toggleDialog()}
        className="SettingsDialog"
      >
        <div className="bp3-dialog-body">
          <div className="SettingsDialog__section">
            <FormGroup
              helperText={intl.formatMessage(messages.helpText)}
              label={intl.formatMessage(messages.label)}
            >
              <div className="SettingsDialog__type-select">
                {typeOptions.map(this.renderPivotType)}
              </div>
            </FormGroup>
          </div>
        </div>
        <div className="bp3-dialog-footer">
          <div className="bp3-dialog-footer-actions">
            <Button
              intent={Intent.PRIMARY}
              text={intl.formatMessage(messages.submit)}
              type="submit"
              onClick={() => toggleDialog({ pivotTypes })}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}
