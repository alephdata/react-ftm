import * as React from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import {Value, Values} from "@alephdata/followthemoney";
import {ControlGroup, FormGroup, MenuItem, Position, TagInput} from "@blueprintjs/core";
import {ItemRenderer, MultiSelect} from "@blueprintjs/select";
import {ITypeEditorProps} from "./common";
import {highlightText} from "../utils";

const messages = defineMessages({
  no_results: {
    id: 'enum_value_select.no_results',
    defaultMessage: 'No results found',
  },
});

const AbstractMultiSelect = MultiSelect.ofType<[string, string]>()

interface IEnumValueSelectProps extends ITypeEditorProps, WrappedComponentProps {
  fullList:Map<string, string>
}

class EnumValueSelect extends React.PureComponent<IEnumValueSelectProps> {
  private inputRef: HTMLInputElement | null = null;

  constructor(props: any) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  componentDidMount() {
    this.inputRef && this.inputRef.focus();
  }

  onChange([countryId, label]: [string, string]) {
    const { values } = this.props;
    this.props.onSubmit([...values, ...[countryId]]);
  }

  getAvailableOptions() {
    const { fullList, values } = this.props;

    const optionsMap = new Map(fullList)
    values.forEach((valKey: any) => optionsMap.delete(valKey))

    return Array.from(optionsMap.entries())
      .sort((a, b) => a[1] > b[1] ? 1 : -1);
  }

  getIdLabelPairs() {
    const { fullList, values } = this.props;

    return values.map((valKey: any) => {
      const countryLabel = fullList.get(valKey)
      return [valKey, countryLabel] as [string, string]
    })
  }

  // blueprint function returns the tag label instead of the tag id
  onRemove(valToRemove: Value) {
    const { fullList, values } = this.props;

    const toRemove = Array.from(fullList.entries())
      .find(([key, val]) => val == valToRemove)

    if (toRemove) {
      const nextPropVals = [...values].filter(key => key !== toRemove[0]);
      this.props.onSubmit(nextPropVals as unknown as Values)
    }
  }

  render() {
    const { intl, usePortal } = this.props;

    const availableOptions = this.getAvailableOptions();
    const selectedOptions = this.getIdLabelPairs();

    return <FormGroup>
      <ControlGroup vertical fill >
        <AbstractMultiSelect
          tagRenderer={i => i[1]}
          onItemSelect={this.onChange}
          itemRenderer={([key, label], {handleClick, modifiers, query}) => (
            <MenuItem
              active={modifiers.active}
              disabled={modifiers.disabled}
              key={key}
              onClick={handleClick}
              text={highlightText(label, query)}
            />
          )}
          items={availableOptions}
          popoverProps={{ minimal: true, position: Position.BOTTOM_LEFT, usePortal }}
          tagInputProps={{
            inputRef: (ref) => this.inputRef = ref,
            tagProps: {interactive: false, minimal: true},
            onRemove: this.onRemove,
            placeholder: ''
          }}
          itemListPredicate={(query, items) => {
            const queryProcessed = query.toLowerCase();
            return items.filter(([key, label]) => label.toLowerCase().includes(queryProcessed));
          }}
          selectedItems={selectedOptions}
          noResults={
            <MenuItem disabled text={intl.formatMessage(messages.no_results)} />
          }
          openOnKeyDown
          resetOnSelect
          fill
        />
      </ControlGroup>
    </FormGroup>
  }
}

export default injectIntl(EnumValueSelect);
