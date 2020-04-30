import React from 'react';
import { Values, Value, Property, Entity as EntityObject } from "@alephdata/followthemoney";
import { Classes } from "@blueprintjs/core";

import Country from './Country';
import Date from './Date';
import Entity from './Entity';
import FileSize from './FileSize';
import Language from './Language';
import Numeric from './Numeric';
import Topic from './Topic';
import URL from './URL';
import { ensureArray, wordList } from "../utils";

import './Property.scss';


interface IPropertyCommonProps {
  prop:Property
}

interface IValueProps extends IPropertyCommonProps{
  value:Value
  resolveEntityReference?: (entityId: string) => EntityObject | undefined
}

export class PropertyValue extends React.PureComponent<IValueProps> {
  render() {
    const { prop, resolveEntityReference, value } = this.props;
    if (!value) {
      return null;
    }
    if (prop.type.name === 'entity') {
      const entity = ('string' === typeof value && resolveEntityReference) ? resolveEntityReference(value) : value;
      return <Entity.Label entity={entity as EntityObject} icon />;
    } else if (typeof value !== 'string') {
      return value;
    }

    if (prop.name === 'fileSize') {
      return <FileSize value={+value} />;
    }
    if (prop.type.name === 'country') {
      return <Country.Label code={value as string} fullList={prop.type.values}/>;
    }
    if (prop.type.name === 'topic') {
      return <Topic.Label code={value as string} fullList={prop.type.values}/>;
    }
    if (prop.type.name === 'language') {
      return <Language.Label code={value as string} fullList={prop.type.values}/>;
    }
    if (prop.type.name === 'url') {
      return <URL value={value as string} onClick={(e: React.MouseEvent) => e.stopPropagation()} />;
    }
    if (prop.type.name === 'date') {
      return <Date value={value as string} />;
    }
    if (prop.type.name === 'number') {
      return <Numeric num={+value} />;
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
  separator?: string
  missing?: string
  resolveEntityReference?: (entityId: string) => EntityObject | undefined
}

export class PropertyValues extends React.PureComponent<IPropertyValuesProps > {
  render() {
    const { prop, resolveEntityReference, values, separator = ' · ', missing = '—' } = this.props;
    const vals = ensureArray(values).map(value => (
      <PropertyValue key={typeof value === 'string' ? value : value.id} prop={prop} value={value} resolveEntityReference={resolveEntityReference} />
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
