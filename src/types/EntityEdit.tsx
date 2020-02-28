import * as React from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Entity } from "@alephdata/followthemoney";
import { EntityLabel } from '.';
import { Alignment, Button, ControlGroup, FormGroup, MenuItem, Position } from "@blueprintjs/core";
import { ItemRenderer, MultiSelect } from "@blueprintjs/select";
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

  onSelect = (entity: Entity) => {
    const nextValues = [...this.getSelectedEntities(), ...[entity]];
    this.props.onSubmit(nextValues)
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
      const sourceEntities = entity.properties.get(sourceProp) as Entity[]
      const targetEntities = entity.properties.get(targetProp) as Entity[]
      excludeIds = [...sourceEntities, ...targetEntities].map(e => e.id)
    }
    return Array.from(this.props.entities.values())
      .filter(e => e.schema.isA(property.getRange()) && !this.props.values.includes(e.id) && excludeIds.indexOf(e.id) === -1)
      .sort((a, b) => a.getCaption().toLowerCase() > b.getCaption().toLowerCase() ? 1 : -1);
  }

  render() {
    const { intl } = this.props;
    const items = this.getItemsList()
    const selectedEntities = this.getSelectedEntities();

    return <FormGroup>
      <ControlGroup vertical fill >
        <EntityMultiSelect
          tagRenderer={entity => <EntityLabel entity={entity} icon />}
          onItemSelect={this.onSelect}
          itemRenderer={this.itemRenderer}
          items={items}
          popoverProps={{
            position: Position.BOTTOM_LEFT,
            minimal: true,
            targetProps: {style: {width: '100%'}}
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
      </ControlGroup>
    </FormGroup>
  }
}

const EntityEdit = injectIntl(EntityEditBase) as any;
// InjectIntl doesn't hoist component statics: https://github.com/formatjs/react-intl/issues/196
hoistNonReactStatics(EntityEdit, EntityEditBase);

export default EntityEdit;
