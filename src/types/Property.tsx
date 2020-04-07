import React from 'react';
import {Values, Value, Property, Entity} from "@alephdata/followthemoney";

import {
  EntityLabel,
  DateComponent,
  EnumValue, LanguageName, URL
} from '.';
import {wordList} from "../utils";
import {Classes} from "@blueprintjs/core";

interface IPropertyCommonProps {
  prop:Property
}

interface IValueProps extends IPropertyCommonProps{
  value:Value
  entitiesList: Map<string, Entity>
}

export class PropertyValue extends React.PureComponent<IValueProps> {
  render() {
    const { entitiesList, value, prop } = this.props;
    if (!value) {
      return null;
    }

    if (prop.type.name === 'country') {
      return <EnumValue code={value as string} countries={prop.type.values}/>;
    }
    if (prop.type.name === 'language') {
      return <LanguageName code={value as string} languages={prop.type.values}/>;
    }
    if (prop.type.name === 'url') {
      return <URL value={value as string} />;
    }
    if (prop.type.name === 'entity') {
      const entity = 'string' === typeof value ? entitiesList.get(value) : value;
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
  entitiesList: Map<string, Entity>
}

export class PropertyValues extends React.PureComponent<IPropertyValuesProps > {
  render() {
    const { entitiesList, prop, values } = this.props;
    const vals = values.map(value => (
      <PropertyValue key={value.toString()} prop={prop} value={value} entitiesList={entitiesList} />
    ));
    if (!vals.length) {
      return (<span>—</span>);
    // display urls separated by newline
    } else if (prop.type.name === 'url') {
      return vals.map(val => <span style={{ display: 'block' }}>{val}</span>);
    } else {
      return (<span>{ wordList(vals, ' · ') }</span>);
    }
  }
}
