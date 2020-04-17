import * as React from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Entity } from "@alephdata/followthemoney";
import { EntityLabel } from './Entity';
import { Alignment, Button, ControlGroup, FormGroup, MenuItem, Position } from "@blueprintjs/core";
import { ItemRenderer, MultiSelect, Select } from "@blueprintjs/select";
import { ITypeProps } from "./common";
import { highlightText, matchText } from "../utils";

const messages = defineMessages({
  placeholder: {
    id: 'editor.entity.placeholder',
    defaultMessage: 'Select an entity',
  },
});

interface IEntityTypeProps extends ITypeProps, WrappedComponentProps {
  entities: Map<string, Entity>
}

const EntityMultiSelect = MultiSelect.ofType<Entity>();
const EntitySelect = Select.ofType<Entity>();

class EntityEditBase extends React.Component<IEntityTypeProps> {
  static group = new Set(['entity']);
  private inputRef: HTMLElement | null = null;

  componentDidMount() {
    this.inputRef && this.inputRef.focus();
  }

  itemRenderer: ItemRenderer<Entity> = (entity, {handleClick, modifiers, query}) => {
    if (!matchText(entity.getCaption() || '', query)) {
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

  getSelectedEntities(): Array<Entity>{
    return this.props.values.map(e => {
      if (typeof e === 'string'){
        return this.props.entities.get(e) as Entity
      } else return e
    })
  }

  onRemove = (toRemove: any) => {
    const idToRemove = toRemove?.props?.entity?.id;
    const nextValues = this.getSelectedEntities()
      .filter(e => e.id !== idToRemove);

    this.props.onSubmit(nextValues)
  }

  getItemsList() {
    const { property, entity } = this.props;
    const selectedIds = this.getSelectedEntities().map(e => e.id);
    let excludeIds: string[] = [...[entity.id], ...selectedIds];

    // exclude source and target entities from options (to avoid self-referential edges)
    if (entity.schema.edge) {
      const {source, target} = entity.schema.edge
      const sourceProp = entity.schema.getProperty(source)
      const targetProp = entity.schema.getProperty(target)
      const sourceEntity = entity.getFirst(sourceProp) as string
      const targetEntity = entity.getFirst(targetProp) as string
      excludeIds = [...excludeIds, ...[sourceEntity], ...[targetEntity]];
    }
    return Array.from(this.props.entities.values())
      .filter(e => e.schema.isA(property.getRange()) && !this.props.values.includes(e.id) && excludeIds.indexOf(e.id) === -1)
      .sort((a, b) => a.getCaption().toLowerCase() > b.getCaption().toLowerCase() ? 1 : -1);
  }

  render() {
    const { entity, intl, onSubmit, usePortal } = this.props;
    const items = this.getItemsList()
    const selectedEntities = this.getSelectedEntities();
    const buttonText = selectedEntities && selectedEntities.length
      ? <EntityLabel entity={selectedEntities[0]} icon />
      : intl.formatMessage(messages.placeholder);

    const allowMultiple = !entity.schema.isEdge;


    return <FormGroup>
      <ControlGroup vertical fill >
        {!allowMultiple && (
          <EntitySelect
            onItemSelect={(entity: Entity) => onSubmit([entity])}
            itemRenderer={this.itemRenderer}
            items={items}
            popoverProps={{
              position: Position.BOTTOM_LEFT,
              minimal: true,
              targetProps: {style: {width: '100%'}},
              usePortal
            }}
            resetOnSelect
            filterable={false}
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
            onItemSelect={(entity: Entity) => onSubmit([...this.getSelectedEntities(), ...[entity]])}
            itemRenderer={this.itemRenderer}
            items={items}
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
            selectedItems={selectedEntities}
            openOnKeyDown
            resetOnSelect
            fill
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
