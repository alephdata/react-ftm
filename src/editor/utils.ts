import { defineMessages } from 'react-intl';
import { Schema, Property, Values } from '@alephdata/followthemoney';

export const validationMessages = defineMessages({
  invalidDate: {
    id: 'editor.validation.date_invalid',
    defaultMessage: 'Date format: yyyy-m-d',
  },
  invalidUrl: {
    id: 'editor.validation.url_invalid',
    defaultMessage: 'Invalid URL format',
  },
  invalidCountry: {
    id: 'editor.validation.country_invalid',
    defaultMessage: 'Invalid country',
  },
  invalidTopic: {
    id: 'editor.validation.topic_invalid',
    defaultMessage: 'Invalid topic',
  },
  required: {
    id: 'editor.validation.required',
    defaultMessage: 'This property is required',
  },
});

function isValidUrl(value: string) {
  try {
    new URL(value);
  } catch (e) {
    return false;
  }

  return true;
};

function isValidEnumValue(property: Property, value: string) {
  return property.type.values.has(value);
};

export function validate({ schema, property, values }: { schema: Schema, property: Property, values: Values}) {
  if (!values || !values.length) {
    const isPropRequired = schema.required.indexOf(property.name) > -1;
    return isPropRequired ? validationMessages.required : null;
  }
  const propType = property.type.name;

  if (propType === 'url') {
    return values.some(val => !isValidUrl(val as string)) ? validationMessages.invalidUrl : null;
  } else if (propType === 'date') {
    const dateRegex = RegExp(/^([12]\d{3}(-[01]?[0-9](-[0123]?[0-9]([T ]([012]?\d(:\d{1,2}(:\d{1,2}(\.\d{6})?(Z|[-+]\d{2}(:?\d{2})?)?)?)?)?)?)?)?)?$/)
    return values.some(val => !dateRegex.test(val as string)) ? validationMessages.invalidDate : null;
  } else if (propType === 'country') {
    return values.some(val => !isValidEnumValue(property, val as string)) ? validationMessages.invalidCountry : null;
  } else if (propType === 'topic') {
    return values.some(val => !isValidEnumValue(property, val as string)) ? validationMessages.invalidTopic : null;
  }
  return null;
}

export function checkEntityRequiredProps(entityData: any) {
  const { schema, properties } = entityData;

  return schema.required.some((propName: string) => !properties.hasOwnProperty(propName)) ? validationMessages.required : null;
}
