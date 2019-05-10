import React, {PureComponent} from "react";
import {Entity, Property, Values} from "@alephdata/followthemoney";
import {ControlGroup, FormGroup, MenuItem} from "@blueprintjs/core";
import {ItemPredicate, ItemRenderer, MultiSelect} from "@blueprintjs/select";
import {ITypeProps} from "./common";
import {highlightText} from "../../utils";

interface IEntityTypeProps extends ITypeProps {
  entities: Map<string, Entity>
}

const EntityMultiSelect = MultiSelect.ofType<Entity>();


export class EntityType extends PureComponent<IEntityTypeProps> {
  static group = new Set(['entity'])

  itemPredicate: ItemPredicate<Entity> = (query: string, entity: Entity) => {
    const caption = entity.getCaption();
    console.log(caption)
    if (caption) {
      return caption.includes(query.trim());
    } else {
      return false
    }
  }

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
  onChange = (item:Entity) => {
    console.log(item);
    const values = this.props.values;

    this.props.onPropertyChanged([...values, item.id], this.props.property)
  }

  render() {
    const {property} = this.props;
    return <FormGroup
      label={property.description || property.label || property.name}
    >
        <EntityMultiSelect
          itemRenderer={this.itemRenderer}
          onItemSelect={this.onChange}
          selectedItems={this.props.values.map(e => {
            if(typeof e === 'string'){
              return this.props.entities.get(e) as Entity
            } else return e
          })}
          items={Array.from(this.props.entities.values())
            .filter(e => e.schema.isThing() && !this.props.values.includes(e.id))
          }
          tagRenderer={e => e.getCaption()}
        />
    </FormGroup>
  }
}
