import React from 'react';
import {Values, Value, Property, Entity} from "@alephdata/followthemoney";

import {
  EntityLabel,
  DateComponent,
  Numeric, CountryName, LanguageName, URL
} from '.';
import {wordList} from "../../utils";
import {Classes} from "@blueprintjs/core";

interface IPropertyCommonProps {
  prop:Property
}

interface IValueProps extends IPropertyCommonProps{
  value:Value
}

class PropertyValue extends React.PureComponent<IValueProps> {
  render() {
    const { value, prop } = this.props;
    if (!value) {
      return null;
    }
    if (prop.type.name === 'country') {
      return <CountryName code={value as string} />;
    }
    if (prop.type.name === 'language') {
      return <LanguageName code={value as string} />;
    }
    if (prop.type.name === 'url') {
      return <URL value={value} />;
    }
    if (prop.type.name === 'entity') {
      return <EntityLabel entity={value as Entity} icon />;
    }
    if (prop.type.name === 'date') {
      return <DateComponent value={value as string} />;
    }
    if (prop.type.name === 'number') {
      return <Numeric num={Number(value)} />;
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

interface IProeprtyValuesProps extends IPropertyCommonProps{
  values:Values
}

export class PropertyValues extends React.PureComponent<IProeprtyValuesProps > {
  render() {
    const { prop, values } = this.props;
    const vals = values.map(value => (
      <PropertyValue key={value.toString()} prop={prop} value={value} />
    ));
    if (!vals.length) {
      return (<span className={Classes.TEXT_MUTED}>—</span>);
    }
    return (<span>{ wordList(vals, ' · ') }</span>);
  }
}

