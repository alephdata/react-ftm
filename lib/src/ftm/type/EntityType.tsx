import React, {PureComponent} from "react";
import {Entity} from "@alephdata/followthemoney";
import {FormGroup, MenuItem} from "@blueprintjs/core";
import {ItemPredicate, ItemRenderer, MultiSelect} from "@blueprintjs/select";
import {ITypeProps, predicate} from "./common";
import {highlightText} from "../../utils";
import {bindExpression} from "@babel/types";

interface IEntityTypeProps extends ITypeProps {
  entities: Map<string, Entity>
}

const EntityMultiSelect = MultiSelect.ofType<Entity>();


export class EntityType extends PureComponent<IEntityTypeProps> {
  static group = new Set(['entity'])

  constructor(props:IEntityTypeProps) {
    super(props);

    this.ensureInstance = this.ensureInstance.bind(this);
  }


  itemPredicate: ItemPredicate<Entity> = (query: string, entity: Entity) => {
    return predicate(entity.getCaption() || '', query)
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

  ensureInstance():Array<Entity>{
    return this.props.values.map(e => {
      if(typeof e === 'string'){
        return this.props.entities.get(e) as Entity
      } else return e
    })
  }
  onChange = (item:Entity) => {
    const values = this.props.values;
    this.props.onPropertyChanged([...values, item.id], this.props.property)
  }

  render() {
    const {property} = this.props;
    const availableItems = Array.from(this.props.entities.values())
      // you are more likely to want only `Things`
      .filter(e => e.schema.isThing() && !this.props.values.includes(e.id));

    return <FormGroup label={property.description || property.label || property.name}>
      <EntityMultiSelect
        itemPredicate={this.itemPredicate}
        itemRenderer={this.itemRenderer}
        onItemSelect={this.onChange}
        selectedItems={this.ensureInstance()}
        items={availableItems}
        tagRenderer={e => e.getCaption()}
      />
    </FormGroup>
  }
}
