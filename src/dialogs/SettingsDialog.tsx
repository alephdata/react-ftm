import * as React from 'react';
import _ from 'lodash';
import { defineMessages, WrappedComponentProps } from 'react-intl';
import { Intent, ControlGroup, InputGroup, Colors, Checkbox } from '@blueprintjs/core'
import { Model } from "@alephdata/followthemoney";

import { GraphContext, IGraphContext } from '../GraphContext'
import { ColorPicker } from '../editors'
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
  model: Model
}

export class SettingsDialog extends React.Component<ISettingsDialogProps> {
  constructor(props: any) {
    super(props);
    // this.onChangeLabel = this.onChangeLabel.bind(this);
    // this.onChangeColor = this.onChangeColor.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  renderCheckbox(type) {
    const isSelected = true;
    return (
      <Checkbox
        checked={isSelected}
        label={type.label}
        onChange={() => this.props.updateSelection(entity)}
      />
    );
  }

  render() {
    const { intl, isOpen, model, toggleDialog } = this.props;

    console.log(model);

    const typeOptions = _.sortBy(Object.values(model.types), ['label']);

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
            <div className="SettingsDialog__type-select">
              {typeOptions.map(this.renderCheckbox)}
            </div>
          </div>
        </form>
      </Dialog>
    );
  }
}
