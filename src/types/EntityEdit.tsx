import * as React from 'react'
import {Entity} from "@alephdata/followthemoney";
import {FormGroup, MenuItem, Button, Position, Alignment} from "@blueprintjs/core";
import {ItemPredicate, ItemRenderer, Select} from "@blueprintjs/select";
import {ITypeProps} from "./common";
import {highlightText, matchText} from "../utils";

interface IEntityTypeProps extends ITypeProps {
  entities: Map<string, Entity>
}

const EntitySelect = Select.ofType<Entity>();


export class EntityEdit extends React.PureComponent<IEntityTypeProps> {
  static group = new Set(['entity'])

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
    this.props.onPropertyChanged(nextValues, this.props.property)
  }

  render() {
    const { property } = this.props;
    const items = Array.from(this.props.entities.values())
      .filter(e => e.schema.isA(property.getRange()) && !this.props.values.includes(e.id));
    const selectedEntity = this.ensureInstance()[0];
    const buttonText = selectedEntity ? selectedEntity.getCaption() : 'Select from list?@PUDO';
    return <FormGroup label={property.label}>
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
          rightIcon="double-caret-vertical" />
      </EntitySelect>
    </FormGroup>
  }
}
