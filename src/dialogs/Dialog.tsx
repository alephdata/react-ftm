import * as React from 'react'
import { Dialog as Bp3Dialog, IconName, Spinner } from '@blueprintjs/core'
import { Schema } from '@alephdata/followthemoney'
import c from 'classnames';

import "./Dialog.scss";

interface IDialogProps {
  icon: IconName,
  isOpen: boolean,
  isProcessing: boolean,
  title: string,
  toggleDialog: () => any,
}

class Dialog extends React.Component<IDialogProps> {
  render() {
    const { children, icon, isOpen, isProcessing, title, toggleDialog } = this.props;

    return (
      <Bp3Dialog
        icon={icon}
        isOpen={isOpen}
        title={title}
        onClose={toggleDialog}
        className="Dialog"
        portalClassName="dialog-portal-container"
      >
        <div className={c('Dialog__content', isProcessing)}>
          {children}
          {isProcessing && (
            <div className="Dialog__loading-overlay">
              <Spinner />
            </div>
          )}
        </div>
      </Bp3Dialog>
    );
  }
}

export default Dialog;
