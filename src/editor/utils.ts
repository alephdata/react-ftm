import { Entity, Property, Values } from '@alephdata/followthemoney';

export const validationErrors = {
  REQUIRED: 'required',
  URL_INVALID: 'invalidUrl',
  DATE_INVALID: 'invalidDate',
};

function isValidUrl(value: string) {
  try {
    new URL(value);
  } catch (e) {
    return false;
  }

  return true;
};

export function validate({ entity, property, values }) {
  const isPropRequired = entity.schema.required.indexOf(property.name) > -1;

  if (isPropRequired && (!values || !values.length)) {
    return validationErrors.REQUIRED;
  }
  const propType = property.type.name;

  if (propType === 'url') {
    return values.some(val => !isValidUrl(val as string)) ? validationErrors.URL_INVALID : null;
  } else if (propType === 'date') {
    const dateRegex = RegExp(/^([12]\d{3}(-[01]?[0-9](-[0123]?[0-9]([T ]([012]?\d(:\d{1,2}(:\d{1,2}(\.\d{6})?(Z|[-+]\d{2}(:?\d{2})?)?)?)?)?)?)?)?)?$/)
    return values.some(val => !dateRegex.test(val as string)) ? validationErrors.DATE_INVALID : null;
  }
  return null;
}
