import React from 'react';
import { defineMessages, FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import { Values, Value, Property as FTMProperty, Entity as FTMEntity } from "@alephdata/followthemoney";

import {
  Country,
  Date,
  Entity,
  FileSize,
  Language,
  Transliterate,
  Numeric,
  Topic,
  URL
} from '.';
import { ensureArray, wordList, withTranslator } from 'utils';


import './Property.scss';


interface IPropertyCommonProps {
  prop: FTMProperty
}

class PropertyName extends React.PureComponent<IPropertyCommonProps> {
  render() {
    const { prop } = this.props;
    return prop.label;
  }
}

// ----------

interface IPropertyReverseProps extends IPropertyCommonProps, WrappedComponentProps {}

class PropertyReverse extends React.PureComponent<IPropertyReverseProps> {
  render() {
    const { prop } = this.props;
    if (!prop.hasReverse) {
      return <FormattedMessage
        id="property.inverse"
        defaultMessage="'{label}' of …"
        values={{
          label: <PropertyName prop={prop} />
        }}
      />;
    }
    const reverseProp = prop.getReverse();
    return reverseProp.label;
  }
}

// ----------

interface IPropertyValueProps extends IPropertyCommonProps{
  value:Value
  resolveEntityReference?: (entityId: string) => FTMEntity | undefined
  getEntityLink?: (entity: FTMEntity) => any
  translitLookup?: any
}

const getSortValue = ({ prop, resolveEntityReference, value }:IPropertyValueProps) => {
  if (prop.type.name === 'entity') {
    const entity = ('string' === typeof value && resolveEntityReference) ? resolveEntityReference(value) : value as FTMEntity;
    return entity ? entity.getCaption().toLowerCase() : value;
  } else if (prop.type.name === 'number' || prop.type.name === 'fileSize') {
    return +value;
  } else if (prop.type.name === 'country' || prop.type.name === 'topic' || prop.type.name === 'language') {
    const resolved = prop.type.values.get(value as string);
    return resolved ? resolved.toLowerCase() : value;
  }
  return (value as string).toLowerCase();
}

class PropertyValue extends React.PureComponent<IPropertyValueProps> {
  render() {
    const { getEntityLink, prop, resolveEntityReference, value, translitLookup } = this.props;
    if (!value) {
      return null;
    }
    if (prop.type.name === 'entity') {
      const entity = ('string' === typeof value && resolveEntityReference) ? resolveEntityReference(value) : value;
      if (getEntityLink) {
        return getEntityLink(entity as FTMEntity);
      }
      return <Entity.Label entity={entity as FTMEntity} icon />;
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
    if (prop.type.name === 'number' && !isNaN(+value)) {
      return <Numeric num={+value} />;
    }
    if (prop.type.name === 'name' || prop.type.name === 'address') {
      return <Transliterate value={value} lookup={translitLookup} />;
    }
    return value
  }
}

// ----------

interface IPropertyValuesProps extends IPropertyCommonProps, WrappedComponentProps {
  values:Values
  separator?: string
  missing?: string
  resolveEntityReference?: (entityId: string) => FTMEntity | undefined
  getEntityLink?: (entity: FTMEntity) => any
  translitLookup?: any
  truncate?: number
}

class PropertyValues extends React.PureComponent<IPropertyValuesProps > {
  render() {
    const { getEntityLink, prop, resolveEntityReference, values, truncate, separator = ' · ', missing = '—', translitLookup } = this.props;
    const vals = ensureArray(truncate ? values.slice(0, truncate) : values).map(value => (
      <PropertyValue
        key={typeof value === 'string' ? value : value.id}
        prop={prop}
        value={value}
        resolveEntityReference={resolveEntityReference}
        getEntityLink={getEntityLink}
        translitLookup={translitLookup}
      />
    ));
    let content;
    if (!vals.length) {
      content = (<span className="no-value">{missing}</span>);
    // display urls separated by newline
    } else if (prop.type.name === 'url' || !!getEntityLink) {
      content = vals.map((val, i) => <span key={i} style={{ display: 'block' }}>{val}</span>);
    } else {
      content = wordList(vals, separator);
    }

    const truncateText = (!!truncate && values.length > truncate) && (
      <span className="more-text">
        <FormattedMessage
          id='property.values.truncate'
          defaultMessage='+{truncateCount} More'
          values={{ truncateCount: values.length - truncate }}
        />
      </span>
    );

    return <span className="PropertyValues">{content}{truncateText}</span>;
  }
}

class Property extends React.Component {
  static Name = PropertyName;

  static Reverse = withTranslator(injectIntl(PropertyReverse));

  static getSortValue = getSortValue;

  static Value = PropertyValue;

  static Values = withTranslator(injectIntl(PropertyValues));
}

export default Property;
