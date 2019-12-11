import * as React from 'react'
import { Dialog, Intent, ControlGroup, InputGroup, Colors } from '@blueprintjs/core'
import { GraphContext, IGraphContext } from '../GraphContext'
import { ColorPicker } from './ColorPicker'

import { Point, Grouping } from '../layout'

interface IGroupingCreateDialogProps {
  isOpen: boolean,
  toggleDialog: () => any,
}

interface IGroupingCreateDialogState {
  label: string,
  color?: string,
}

export class GroupingCreateDialog extends React.Component<IGroupingCreateDialogProps, IGroupingCreateDialogState> {
  static contextType = GraphContext;
  context!: React.ContextType<typeof GraphContext>;
  state: IGroupingCreateDialogState = {
    label: ''
  }

  constructor(props: any) {
    super(props);
    this.onChangeLabel = this.onChangeLabel.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeLabel(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ label: e.target.value })
  }

  onChangeColor(color: string) {
    this.setState({ color })
  }

  onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    const { label, color } = this.state
    const { layout, updateLayout, viewport, updateViewport } = this.context as IGraphContext
    e.preventDefault()

    const selectedVertices = layout.getSelectedVertices().filter(vertex => !vertex.isHidden())
    const grouping = Grouping.fromVertices(layout, label, selectedVertices, color);

    if (grouping) {
      layout.addGrouping(grouping);
      layout.clearSelection();
      this.setState({label: ''})
      this.props.toggleDialog()
    }
  }

  render() {
    const { layout } = this.context as IGraphContext
    const { isOpen, toggleDialog } = this.props
    return (
      <Dialog icon="group-objects" isOpen={isOpen} title="Group items" onClose={toggleDialog}>
        <form onSubmit={this.onSubmit}>
          <div className="bp3-dialog-body">
            <ControlGroup fill>
              <InputGroup
                autoFocus
                large
                className="bp3-fill"
                value={this.state.label}
                onChange={this.onChangeLabel}
                placeholder="Select a label for the grouping"
              />
            </ControlGroup>
          </div>
        </form>
      </Dialog>
    );
  }
}
