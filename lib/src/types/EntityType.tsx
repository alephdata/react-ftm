import * as React from 'react'
import {Entity} from "@alephdata/followthemoney";
import {FormGroup, MenuItem} from "@blueprintjs/core";
import {ItemPredicate, ItemRenderer, MultiSelect} from "@blueprintjs/select";
import {ITypeProps} from "./common";
import {highlightText, matchText} from "../utils";

interface IEntityTypeProps extends ITypeProps {
  entities: Map<string, Entity>
}

const EntityMultiSelect = MultiSelect.ofType<Entity>();


export class EntityType extends React.PureComponent<IEntityTypeProps> {
  static group = new Set(['entity'])

  constructor(props:IEntityTypeProps) {
    super(props);
    this.ensureInstance = this.ensureInstance.bind(this);
    this.onRemove = this.onRemove.bind(this);
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

  onAdd = (item:Entity) => {
    const nextValues = [...this.props.values,item.id];
    this.props.onPropertyChanged(nextValues, this.props.property)
  }

  onRemove(label:string, index:number){
    let nextValues = [...this.props.values];
    nextValues.splice(index,1);
    this.props.onPropertyChanged(nextValues, this.props.property)
  }

  render() {
    const { property } = this.props;
    const label = property.description || property.label || property.name
    const items = Array.from(this.props.entities.values())
      .filter(e => e.schema.isA(property.getRange()) && !this.props.values.includes(e.id));

    return <FormGroup label={label}>
      <EntityMultiSelect
        resetOnSelect
        popoverProps={{
          minimal: true
        }}
        tagInputProps={{
          addOnBlur: true,
          fill: true,
          onRemove: this.onRemove
        }}
        itemPredicate={this.itemPredicate}
        itemRenderer={this.itemRenderer}
        onItemSelect={this.onAdd}
        selectedItems={this.ensureInstance()}
        items={items}
        tagRenderer={e => e.getCaption()}
      />
    </FormGroup>
  }
}
