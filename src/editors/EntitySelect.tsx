import * as React from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { Entity as FTMEntity } from "@alephdata/followthemoney";
import { Entity } from 'types';
import { Alignment, Button, ControlGroup, Menu, MenuItem, Spinner } from "@blueprintjs/core";
import { ItemRenderer, MultiSelect, Select } from "@blueprintjs/select";
import { ITypeEditorProps } from "./common";

import './EntitySelect.scss';

const messages = defineMessages({
  no_results: {
    id: 'editor.entity.no_results',
    defaultMessage: 'No matching results found',
  },
  placeholder: {
    id: 'editor.entity.placeholder',
    defaultMessage: 'Select an entity',
  },
});

interface IEntityTypeProps extends ITypeEditorProps, WrappedComponentProps {
  allowMultiple: boolean
  values: Array<FTMEntity>
  entitySuggestions: Array<FTMEntity>
  isFetching: boolean
  onQueryChange: (query: string) => void
  noResultsText?: string
  buttonProps?: any
}

interface IEntitySelectState {
  query: string
}

const TypedMultiSelect = MultiSelect.ofType<FTMEntity>();
const TypedSelect = Select.ofType<FTMEntity>();

class EntitySelect extends React.Component<IEntityTypeProps, IEntitySelectState> {
  private inputRef: HTMLElement | null = null;

  constructor(props:IEntityTypeProps) {
    super(props);

    this.state = {
      query: ''
    }

    this.onQueryChange = this.onQueryChange.bind(this);
    this.itemListRenderer = this.itemListRenderer.bind(this);
  }

  componentDidMount() {
    this.inputRef && this.inputRef.focus();
    this.onQueryChange('');
  }

  itemRenderer: ItemRenderer<FTMEntity> = (entity, { handleClick, modifiers }) => {
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        key={entity.id}
        onClick={handleClick}
        text={<Entity.Label entity={entity} icon transliterate={false} />}
      />
    );
  }

  onRemove = (toRemove: any) => {
    const idToRemove = toRemove?.props?.entity?.id;
    const nextValues = this.props.values
      .filter(e => e.id !== idToRemove);

    this.props.onSubmit(nextValues)
  }

  itemListRenderer(rendererProps: any) {
    const { intl, isFetching, noResultsText } = this.props;
    const { filteredItems, itemsParentRef, renderItem } = rendererProps;

    let content;
    if (isFetching) {
      content = <Spinner className="VertexCreateDialog__spinner" size={Spinner.SIZE_SMALL} />
    } else if (filteredItems.length === 0) {
      content = <span className="error-text">{noResultsText || intl.formatMessage(messages.no_results)}</span>
    } else {
      content = filteredItems.map(renderItem);
    }

    return (
      <Menu ulRef={itemsParentRef}>
        {content}
      </Menu>
    );
  }

  onQueryChange(query: string) {
    this.setState({ query });
    this.props.onQueryChange(query);
  }

  render() {
    const { allowMultiple, entitySuggestions, intl, onSubmit, inputProps = {}, popoverProps = {}, buttonProps = {}, values } = this.props;
    const { query } = this.state;
    const buttonText = values.length
      ? <Entity.Label entity={values[0]} icon transliterate={false} />
      : (buttonProps?.placeholder || intl.formatMessage(messages.placeholder));

    const filteredSuggestions = entitySuggestions.filter(e => (!values.find(val => val.id === e.id )))

    return <ControlGroup className="EntitySelect" vertical fill>
        {!allowMultiple && (
          <TypedSelect
            onItemSelect={(entity: FTMEntity) => onSubmit([entity])}
            itemRenderer={this.itemRenderer}
            itemListRenderer={this.itemListRenderer}
            items={filteredSuggestions}
            popoverProps={{
              minimal: true,
              targetProps: {style: {width: '100%'}},
              ...popoverProps
            }}
            resetOnSelect
            filterable
            query={query}
            onQueryChange={this.onQueryChange}
          >
            <Button
              text={buttonText}
              alignText={Alignment.LEFT}
              rightIcon="double-caret-vertical"
              elementRef={(ref) => this.inputRef = ref }
              fill
              {...buttonProps}
            />
          </TypedSelect>
        )}
        {allowMultiple && (
          <TypedMultiSelect
            tagRenderer={entity => <Entity.Label entity={entity} icon transliterate={false} />}
            onItemSelect={(entity: FTMEntity) => onSubmit([...values, entity])}
            itemRenderer={this.itemRenderer}
            itemListRenderer={this.itemListRenderer}
            items={filteredSuggestions}
            popoverProps={{
              minimal: true,
              targetProps: {style: {width: '100%'}},
              ...popoverProps
            }}
            tagInputProps={{
              inputRef: (ref) => this.inputRef = ref,
              tagProps: {interactive: false, minimal: true},
              onRemove: this.onRemove,
              placeholder: '',
              ...inputProps
            }}
            selectedItems={values}
            resetOnSelect
            fill
            query={query}
            onQueryChange={this.onQueryChange}
          />
        )}
      </ControlGroup>
  }
}

export default injectIntl(EntitySelect);
