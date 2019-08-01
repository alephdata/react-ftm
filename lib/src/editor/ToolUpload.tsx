import React, {useState} from 'react';
import { IGraphContext } from '../GraphContext';
import { GraphLayout } from '../layout/GraphLayout';
import {Button, FileInput, Tooltip, Dialog, Classes} from '@blueprintjs/core';

interface IToolUploadProps extends IGraphContext {
}

export function ToolUpload(props: IToolUploadProps) {
  const {layout, updateLayout} = props;
  const [isOpen, setDialog] = useState<boolean>(false)
  return <>
    <Tooltip content="Load from computed">
      <Button icon="cloud-upload" onClick={() => setDialog(true)}/>
    </Tooltip>

    <Dialog
      lazy
      icon="cloud-upload"
      isOpen={isOpen}
      title="Load from computed"
      onClose={() => setDialog(false)}
    >
      <div className={Classes.DIALOG_BODY}>
        <FileInput onInputChange={(e: React.FormEvent<HTMLInputElement>) => {
          if (e && e.currentTarget && e.currentTarget.files) {
            try {
              const f = new FileReader();
              f.onload = (c: any) => {
                updateLayout(
                  GraphLayout.fromJSON(layout.config, layout.model, JSON.parse(c.target.result))
                );
                setDialog(false)
              }
              f.readAsText(e.currentTarget.files[0])
            } catch (e) {
              // TODO: visualise a warning
            }
          }
        }}/>
      </div>

    </Dialog>
  </>
}
