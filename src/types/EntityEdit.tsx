import * as React from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { Entity as FTMEntity } from "@alephdata/followthemoney";
import Entity from './Entity';
import { Alignment, Button, ControlGroup, FormGroup, Menu, MenuItem, Position, Spinner } from "@blueprintjs/core";
import { ItemListRenderer, ItemRenderer, MultiSelect, Select } from "@blueprintjs/select";
import { ITypeEditorProps } from "./common";

const messages = defineMessages({
  no_results: {
    id: 'editor.entity.no_results',
    defaultMessage: 'No entities found',
  },
  placeholder: {
    id: 'editor.entity.placeholder',
    defaultMessage: 'Select an entity',
  },
});

interface IEntityTypeProps extends ITypeEditorProps, WrappedComponentProps {
  entity: FTMEntity
  values: Array<FTMEntity>
  entitySuggestions: { isPending: boolean, results: Array<FTMEntity> }
  fetchEntitySuggestions: (query: string) => void
}

interface IEntityEditState {
  query: string
}

const EntityMultiSelect = MultiSelect.ofType<FTMEntity>();
const EntitySelect = Select.ofType<FTMEntity>();

class EntityEdit extends React.Component<IEntityTypeProps, IEntityEditState> {
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
  }

  itemRenderer: ItemRenderer<FTMEntity> = (entity, {handleClick, modifiers, query}) => {
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        key={entity.id}
        onClick={handleClick}
        text={<Entity.Label entity={entity} icon />}
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
    const { intl, entitySuggestions } = this.props;
    const { filteredItems, itemsParentRef, renderItem } = rendererProps;

    let content;
    if (entitySuggestions.isPending) {
      content = <Spinner className="VertexCreateDialog__spinner" size={Spinner.SIZE_SMALL} />
    } else if (filteredItems.length === 0) {
      content = <span className="EntityViewer__property-list-item__error">{intl.formatMessage(messages.no_results)}</span>
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
    this.props.fetchEntitySuggestions(query);
  }

  render() {
    const { entitySuggestions, entity, intl, onSubmit, usePortal, values } = this.props;
    const { query } = this.state;
    const buttonText = values.length
      ? <Entity.Label entity={values[0]} icon />
      : intl.formatMessage(messages.placeholder);

    const allowMultiple = !entity.schema.isEdge;

    const filteredSuggestions = entitySuggestions.results
      .filter(e => (e.id !== entity.id && !values.find(val => val.id === e.id )))

    return <FormGroup>
      <ControlGroup vertical fill >
        {!allowMultiple && (
          <EntitySelect
            onItemSelect={(entity: FTMEntity) => onSubmit([entity])}
            itemRenderer={this.itemRenderer}
            itemListRenderer={this.itemListRenderer}
            items={filteredSuggestions}
            popoverProps={{
              position: Position.BOTTOM_LEFT,
              minimal: true,
              targetProps: {style: {width: '100%'}},
              usePortal
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
            />
          </EntitySelect>
        )}
        {allowMultiple && (
          <EntityMultiSelect
            tagRenderer={entity => <Entity.Label entity={entity} icon />}
            onItemSelect={(entity: FTMEntity) => onSubmit([...values, entity])}
            itemRenderer={this.itemRenderer}
            itemListRenderer={this.itemListRenderer}
            items={filteredSuggestions}
            popoverProps={{
              position: Position.BOTTOM_LEFT,
              minimal: true,
              targetProps: {style: {width: '100%'}},
              usePortal
            }}
            tagInputProps={{
              inputRef: (ref) => this.inputRef = ref,
              tagProps: {interactive: false, minimal: true},
              onRemove: this.onRemove,
              placeholder: '',
            }}
            selectedItems={values}
            openOnKeyDown
            resetOnSelect
            fill
            query={query}
            onQueryChange={this.onQueryChange}
          />
        )}
      </ControlGroup>
    </FormGroup>
  }
}

export default injectIntl(EntityEdit);
