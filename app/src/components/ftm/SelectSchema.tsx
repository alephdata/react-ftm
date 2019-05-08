import React, {PureComponent} from 'react';
import {Suggest} from "@blueprintjs/select";
import {Model, Schema} from "@alephdata/followthemoney";
import {MenuItem, NonIdealState} from "@blueprintjs/core";
import {highlightText} from "../../utils";

const SuggestSchema = Suggest.ofType<Schema>()

interface ISelectSchemaProps {
  model: Model,
  subsequentOf: Schema,
  onSchemaSelect:(schema:Schema)=>void
}

export class SelectSchema extends PureComponent<ISelectSchemaProps> {
  private readonly schemataToShow: Schema[];

  constructor(props: ISelectSchemaProps) {
    super(props);
    this.schemataToShow = Object.values(props.model.schemata)
      .filter(schema => schema && schema.isA(props.subsequentOf)) as Schema[]

  }

  render() {
    return <SuggestSchema
      itemPredicate={(query, schema) => `${schema.name}${schema.description}`.includes(query.trim())}
      itemRenderer={(schema, {handleClick, modifiers, query}) => {
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
      }}
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