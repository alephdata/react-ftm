import * as React from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Entity } from "@alephdata/followthemoney";
import { EntityLabel } from './Entity';
import { Alignment, Button, ControlGroup, FormGroup, MenuItem, Position } from "@blueprintjs/core";
import { ItemListRenderer, ItemRenderer, MultiSelect, Select } from "@blueprintjs/select";
import { ITypeProps } from "./common";
import { highlightText, matchText } from "../utils";

const messages = defineMessages({
  placeholder: {
    id: 'editor.entity.placeholder',
    defaultMessage: 'Select an entity',
  },
});

interface IEntityTypeProps extends ITypeProps, WrappedComponentProps {
  entitySuggestions: Array<Entity>
  fetchEntitySuggestions: (query: string) => void
}

interface IEntityEditState {
  query: string
}

const EntityMultiSelect = MultiSelect.ofType<Entity>();
const EntitySelect = Select.ofType<Entity>();

class EntityEditBase extends React.Component<IEntityTypeProps, IEntityEditState> {
  static group = new Set(['entity']);
  private inputRef: HTMLElement | null = null;

  constructor(props) {
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

  itemRenderer: ItemRenderer<Entity> = (entity, {handleClick, modifiers, query}) => {
    if (!entity || !matchText(entity.getCaption() || '', query)) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        key={entity.id}
        onClick={handleClick}
        text={<EntityLabel entity={entity} icon />}
      />
    );
  }

  onRemove = (toRemove: any) => {
    const idToRemove = toRemove?.props?.entity?.id;
    const nextValues = this.props.values
      .filter(e => e.id !== idToRemove);

    this.props.onSubmit(nextValues)
  }

  itemListRenderer(rendererProps: IItemListRendererProps<Entity>) {
    const { filteredItems, itemsParentRef, renderItem } = rendererProps;
    const { isFetchingSuggestions, isProcessing } = this.state;

    if ((!isFetchingSuggestions && !filteredItems.length) || isProcessing) return;

    const content = isFetchingSuggestions
      ? <Spinner className="VertexCreateDialog__spinner" size={Spinner.SIZE_SMALL} />
      : filteredItems.map(renderItem);

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
      ? <EntityLabel entity={values[0]} icon />
      : intl.formatMessage(messages.placeholder);

    const allowMultiple = !entity.schema.isEdge;

    const filteredSuggestions = entitySuggestions
      .filter(e => (e.id !== entity.id && !values.find(val => val.id === e.id )))

    return <FormGroup>
      <ControlGroup vertical fill >
        {!allowMultiple && (
          <EntitySelect
            onItemSelect={(entity: Entity) => onSubmit([entity])}
            itemRenderer={this.itemRenderer}
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
            tagRenderer={entity => <EntityLabel entity={entity} icon />}
            onItemSelect={(entity: Entity) => onSubmit([...values, entity])}
            itemRenderer={this.itemRenderer}
            items={filteredSuggestions}
            popoverProps={{
              position: Position.BOTTOM_LEFT,
              minimal: true,
              targetProps: {style: {width: '100%'}},
              usePortal
            }}
            tagInputProps={{
              inputRef: (ref) => this.inputRef = ref,
              tagProps: {interactive: false, minimal: true, fill: true},
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

const EntityEdit = injectIntl(EntityEditBase) as any;
// InjectIntl doesn't hoist component statics: https://github.com/formatjs/react-intl/issues/196
hoistNonReactStatics(EntityEdit, EntityEditBase);

export default EntityEdit;
