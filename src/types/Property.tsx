import React from 'react';
import { Values, Value, Property, Entity } from "@alephdata/followthemoney";
import { Classes } from "@blueprintjs/core";

import { EntityLabel } from './Entity';
import { DateComponent } from './Date';
import { EnumValue } from './EnumValue';
import { LanguageName } from './Language';
import { URL } from './URL';
import { wordList } from "../utils";

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
    return value;
  }
}


export class PropertyName extends React.PureComponent<IPropertyCommonProps > {
  render() {
    const { prop } = this.props;
    return prop.label;
  }
}

export class PropertyReverse extends React.PureComponent<IPropertyCommonProps> {
  render() {
    const { prop } = this.props;
    if (!prop.hasReverse) {
      return `${prop.label} of ...`
    }
    const reverseProp = prop.getReverse();
    return reverseProp.label;
  }
}

interface IPropertyValuesProps extends IPropertyCommonProps{
  values:Values
  resolveEntityReference: (entityId: string) => Entity | undefined
}

export class PropertyValues extends React.PureComponent<IPropertyValuesProps > {
  render() {
    const { prop, resolveEntityReference, values } = this.props;
    const vals = values.map(value => (
      <PropertyValue key={value.toString()} prop={prop} value={value} resolveEntityReference={resolveEntityReference} />
    ));
    let content;
    if (!vals.length) {
      content = (<span>—</span>);
    // display urls separated by newline
    } else if (prop.type.name === 'url') {
      content = vals.map(val => <span style={{ display: 'block' }}>{val}</span>);
    } else {
      content = (<span>{ wordList(vals, ' · ') }</span>);
    }

    return <span className="PropertyValues">{content}</span>;
  }
}
