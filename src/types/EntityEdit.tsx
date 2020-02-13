import * as React from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {Entity} from "@alephdata/followthemoney";
import {FormGroup, MenuItem, Button, Position, Alignment} from "@blueprintjs/core";
import {ItemPredicate, ItemRenderer, Select} from "@blueprintjs/select";
import {ITypeProps} from "./common";
import {highlightText, matchText} from "../utils";

const messages = defineMessages({
  placeholder: {
    id: 'editor.entity.placeholder',
    defaultMessage: 'Select an entity',
  },
});

interface IEntityTypeProps extends ITypeProps, WrappedComponentProps {
  entities: Map<string, Entity>
}

const EntitySelect = Select.ofType<Entity>();

class EntityEditBase extends React.Component<IEntityTypeProps> {
  static group = new Set(['entity']);
  private inputRef: HTMLElement | null = null;

  componentDidMount() {
    this.inputRef && this.inputRef.focus();
  }

  itemPredicate: ItemPredicate<Entity> = (query: string, entity: Entity) => {
    return matchText(entity.getCaption() || '', query)
  };

  itemRenderer: ItemRenderer<Entity> = (entity, {handleClick, modifiers, query}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    const caption = entity.getCaption();
    const text =  caption || entity.schema.label;
    const label = caption ? entity.schema.label : undefined ;
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        label={label}
        key={entity.id}
        onClick={handleClick}
        text={highlightText(text, query)}
      />
    );
  }

  ensureInstance(): Array<Entity>{
    return this.props.values.map(e => {
      if(typeof e === 'string'){
        return this.props.entities.get(e) as Entity
      } else return e
    })
  }

  onSelect = (item:Entity) => {
    const nextValues = [item.id];
    this.props.onSubmit(nextValues)
  }

  getItemsList() {
    const { property, entity } = this.props;

    let excludeIds: string[] = []

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
    const selectedEntity = this.ensureInstance()[0];
    const buttonText = selectedEntity ? selectedEntity.getCaption() : intl.formatMessage(messages.placeholder);

    return <FormGroup>
      <EntitySelect
        resetOnSelect
        popoverProps={{
          position: Position.BOTTOM_LEFT,
          minimal: true,
          targetProps: {style: {width: '100%'}}
        }}

        itemPredicate={this.itemPredicate}
        itemRenderer={this.itemRenderer}
        onItemSelect={this.onSelect}
        items={items}
      >
        <Button
          text={buttonText}
          fill
          alignText={Alignment.LEFT}
          rightIcon="double-caret-vertical"
          elementRef={(ref) => this.inputRef = ref }
        />
      </EntitySelect>
    </FormGroup>
  }
}

const EntityEdit = injectIntl(EntityEditBase) as any;
// InjectIntl doesn't hoist component statics: https://github.com/formatjs/react-intl/issues/196
hoistNonReactStatics(EntityEdit, EntityEditBase);

export default EntityEdit;
