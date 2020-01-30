import * as React from 'react'
import {Values} from "@alephdata/followthemoney";
import {Button, ControlGroup, FormGroup, InputGroup, TagInput, Tooltip} from "@blueprintjs/core";
import {ITypeProps} from "./common";

import "./TextEdit.scss";


interface ITextEditState {
  forceMultiEdit: boolean,
  currMultiInputValue: string,
}

export class TextEdit extends React.PureComponent<ITypeProps, ITextEditState> {
  static group = new Set(['text', 'string'])
  private containerRef: any | null = null;
  private multiInputRef: HTMLInputElement | null = null;
  private singleInputRef: HTMLInputElement | null = null;

  constructor(props: ITypeProps) {
    super(props);

    this.state = {
      forceMultiEdit: false,
      currMultiInputValue: ''
    }

    this.triggerMultiEdit = this.triggerMultiEdit.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    this.singleInputRef && this.singleInputRef.focus();
    this.multiInputRef && this.multiInputRef.focus();
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps: ITypeProps, prevState: ITextEditState) {
    // ensure multi input is focused
    if (this.state.forceMultiEdit && !prevState.forceMultiEdit) {
      this.multiInputRef && this.multiInputRef.focus();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event: MouseEvent) {
    const { onSubmit, values } = this.props;
    const { currMultiInputValue } = this.state;

    const target = event.target as Element;
    if (target && this.containerRef && !this.containerRef.contains(target)) {
      if (currMultiInputValue) {
        onSubmit([...values, ...[currMultiInputValue]]);
      } else {
        onSubmit(values);
      }
    }
  }

  onChange = (values: Array<string | React.ReactNode>) => {
    // remove duplicates
    this.props.onChange(Array.from(new Set(values)) as unknown as Values)
    if (values.length <= 1) {
      this.setState({ forceMultiEdit: false });
    }
  }

  triggerMultiEdit() {
    this.setState({ forceMultiEdit: true });
  }

  render() {
    const { property, values } = this.props;
    const { currMultiInputValue, forceMultiEdit } = this.state;
    const numVals = values.length;
    // don't show multi button if there is no existing input
    const showMultiToggleButton = numVals !== 0 && values[0] !== '';

    return (
      <div ref={(node) => this.containerRef = node}>
        <FormGroup>
          {(!forceMultiEdit && numVals <= 1) && (
            <InputGroup
              className="TextEdit__singleInput"
              inputRef={(ref) => this.singleInputRef = ref}
              autoFocus
              fill
              value={values[0] as string || ''}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                // avoid setting an empty string val
                return this.onChange(value ? [value] : [])
              }}
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
              inputValue={currMultiInputValue}
              onInputChange={(e:React.ChangeEvent<HTMLInputElement>) => (
                this.setState({ currMultiInputValue: e.target.value })
              )}
            />
          )}
        </FormGroup>
      </div>
    );
  }
}
