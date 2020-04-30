import React from 'react';
import { Values, Value, Property, Entity } from "@alephdata/followthemoney";
import { Classes } from "@blueprintjs/core";

import { EntityLabel } from './Entity';
import { DateComponent } from './Date';
import { EnumValue } from './EnumValue';
import { LanguageName } from './Language';
import { Numeric } from './Numeric';
import { FileSize } from './FileSize';
import { URL } from './URL';
import { ensureArray, wordList } from "../utils";

import './Property.scss';


interface IPropertyCommonProps {
  prop:Property
}

interface IValueProps extends IPropertyCommonProps{
  value:Value
  resolveEntityReference: (entityId: string) => Entity | undefined
}

export class PropertyValue extends React.PureComponent<IValueProps> {
  render() {
    const { prop, resolveEntityReference, value } = this.props;
    if (!value) {
      return null;
    }
    if (prop.name === 'fileSize') {
      return <FileSize value={value} />;
    }
    if (prop.type.name === 'country' || prop.type.name === 'topic') {
      return <EnumValue code={value as string} fullList={prop.type.values}/>;
    }
    if (prop.type.name === 'language') {
      return <LanguageName code={value as string} languages={prop.type.values}/>;
    }
    if (prop.type.name === 'url') {
      return <URL value={value as string} />;
    }
    if (prop.type.name === 'entity') {
      const entity = 'string' === typeof value ? resolveEntityReference(value) : value;
      return <EntityLabel entity={entity as Entity} icon />;
    }
    if (prop.type.name === 'date') {
      return <DateComponent value={value as string} />;
    }
    if (prop.type.name === 'number') {
      return <Numeric num={value} />;
    }
    return value;
  }
}


export class PropertyName extends React.PureComponent<IPropertyCommonProps > {
  render() {
    const { prop } = this.props;
    return prop.label;
  }
}

interface IPropertyValuesProps extends IPropertyCommonProps{
  values:Values
  resolveEntityReference: (entityId: string) => Entity | undefined
}

export class PropertyValues extends React.PureComponent<IPropertyValuesProps > {
  render() {
    const { prop, resolveEntityReference, values, separator = ' · ', missing = '—' } = this.props;
    const vals = ensureArray(values).map(value => (
      <PropertyValue key={value.id || value} prop={prop} value={value} resolveEntityReference={resolveEntityReference} />
    ));
    let content;
    if (!vals.length) {
      content = (<span className="no-value">{missing}</span>);
    // display urls separated by newline
    } else if (prop.type.name === 'url') {
      content = vals.map(val => <span style={{ display: 'block' }}>{val}</span>);
    } else {
      content = (<span>{ wordList(vals, separator) }</span>);
    }

    return <span className="PropertyValues">{content}</span>;
  }
}
