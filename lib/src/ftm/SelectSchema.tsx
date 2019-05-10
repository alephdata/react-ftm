import React, {PureComponent} from 'react';
import {ItemPredicate, ItemRenderer, Suggest} from "@blueprintjs/select";
import {Model, Schema, IconRegistry} from "@alephdata/followthemoney";
import {Menu, MenuItem, NonIdealState} from "@blueprintjs/core";
import {highlightText} from "../utils";
import {predicate} from "./type/common";

const SuggestSchema = Suggest.ofType<Schema>()

interface ISelectSchemaProps {
  disabled: boolean
  model: Model,
  subsequentOf: Schema,
  onSchemaSelect: (schema: Schema) => void
}

export class SchemaDropdown extends PureComponent<ISelectSchemaProps> {
  private schemataToShow: Schema[];

  constructor(props: ISelectSchemaProps) {
    super(props);
    this.schemataToShow = this.computeSchemaList(props.subsequentOf)
  }

  itemPredicate: ItemPredicate<Schema> = (query, schema) => predicate(`${schema.name}${schema.description}`, query)

  itemRender: ItemRenderer<Schema> = (schema, {handleClick, modifiers, query}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    const label = schema.description ? schema.label : undefined;
    const text = schema.description || schema.label;
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        label={label}
        key={schema.name}
        onClick={handleClick}
        text={highlightText(text, query)}
      />
    );
  }

  computeSchemaList(subsequentOf = this.props.subsequentOf) {
    return Object.values(this.props.model.schemata)
      .filter(schema => schema && (schema !== subsequentOf) && schema.isA(subsequentOf)) as Schema[]
  }

  componentWillReceiveProps(nextProps: Readonly<ISelectSchemaProps>, nextContext: any): void {
    if (nextProps.subsequentOf !== this.props.subsequentOf) {
      this.schemataToShow = this.computeSchemaList(nextProps.subsequentOf);
    }
  }

  render() {
    return <SuggestSchema
      disabled={this.props.disabled}
      itemPredicate={this.itemPredicate}
      itemRenderer={this.itemRender}
      resetOnSelect={true}
      onItemSelect={this.props.onSchemaSelect}
      inputValueRenderer={p => p.name}
      items={this.schemataToShow}
      noResults={<NonIdealState
        icon="heart-broken"
        title="No search results"
        description="no such a property found, try using other Schemas"
      />}
    />;
  }
}

export class SelectSchema extends PureComponent<ISelectSchemaProps> {
  private schemataToShow: Schema[];

  constructor(props: ISelectSchemaProps) {
    super(props);
    this.schemataToShow = this.computeSchemaList(props.subsequentOf)
  }

  computeSchemaList(subsequentOf = this.props.subsequentOf) {
    return Object.values(this.props.model.schemata)
      .filter(schema => schema && (schema !== subsequentOf) && schema.isA(subsequentOf)) as Schema[]
  }

  componentWillReceiveProps(nextProps: Readonly<ISelectSchemaProps>, nextContext: any): void {
    if (nextProps.subsequentOf !== this.props.subsequentOf) {
      this.schemataToShow = this.computeSchemaList(nextProps.subsequentOf);
    }
  }

  render() {
    return <Menu>
      {this.schemataToShow.map(schema => {
        const iconPaths = IconRegistry.getIcon(schema.name.toLowerCase());
        const icon = iconPaths && <svg viewBox={'0 0 24 24'} height={20} width={20}>{iconPaths
          .map(d => <path d={d}/>)
        }/></svg>;

        return <MenuItem
          icon={icon}
          onClick={() => this.props.onSchemaSelect(schema)}
          text={schema.description || schema.label}
        />
      })}
    </Menu>;
  }
}
