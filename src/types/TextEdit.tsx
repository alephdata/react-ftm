import * as React from 'react'
import {Values} from "@alephdata/followthemoney";
import {Button, ControlGroup, FormGroup, InputGroup, TagInput, Tooltip} from "@blueprintjs/core";
import {ITypeProps} from "./common";

import "./TextEdit.scss";

interface ITextEditState {
  forceMultiEdit: boolean
}

export class TextEdit extends React.PureComponent<ITypeProps, ITextEditState> {
  static group = new Set(['text', 'string'])
  private multiInputRef: HTMLInputElement | null = null;
  private singleInputRef: HTMLInputElement | null = null;

  constructor(props: ITypeProps) {
    super(props);
    this.triggerMultiEdit = this.triggerMultiEdit.bind(this);

    this.state = {
      forceMultiEdit: false,
    }
  }

  componentDidMount() {
    this.singleInputRef && this.singleInputRef.focus();
    this.multiInputRef && this.multiInputRef.focus();
  }

  componentDidUpdate(prevProps: ITypeProps, prevState: ITextEditState) {
    // ensure multi input is focused
    if (this.state.forceMultiEdit && !prevState.forceMultiEdit) {
      this.multiInputRef && this.multiInputRef.focus();
    }
  }

  onChange = (values: Array<string | React.ReactNode>) => {
    // remove duplicates
    this.props.onPropertyChanged(Array.from(new Set(values)) as unknown as Values, this.props.property)
    if (values.length <= 1) {
      this.setState({ forceMultiEdit: false });
    }
  }

  triggerMultiEdit() {
    this.setState({ forceMultiEdit: true });
  }

  render() {
    const { property, values } = this.props;
    const { forceMultiEdit } = this.state;
    const numVals = values.length;
    // don't show multi button if there is no existing input
    const showMultiToggleButton = numVals !== 0 && values[0] !== '';

    return <FormGroup>
      <ControlGroup vertical fill >
        {(!forceMultiEdit && numVals <= 1) && (
          <InputGroup
            className="TextEdit__singleInput"
            inputRef={(ref) => this.singleInputRef = ref}
            autoFocus
            fill
            value={values[0] as string}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => this.onChange([e.target.value])}
            rightElement={showMultiToggleButton ? (
              <Tooltip content="Add additional values">
                <Button
                  className="TextEdit__toggleMulti"
                  minimal
                  small
                  icon="plus"
                  onClick={this.triggerMultiEdit}
                />
              </Tooltip>
            ) : undefined}
          />
        )}
        {(forceMultiEdit || numVals > 1) && (
          <TagInput
            inputRef={(ref) => this.multiInputRef = ref}
            tagProps={{
              minimal:true,
            }}
            addOnBlur
            addOnPaste
            fill
            onChange={this.onChange}
            values={this.props.values}
          />
        )}
      </ControlGroup>
    </FormGroup>
  }
}
