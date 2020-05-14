import { withTranslator } from '../Translator';

import CountBase from './Count';
import Date from './Date';
import Entity from './Entity';
import EnumValue from './EnumValue';
import FileSize from './FileSize';
import NumericBase from './Numeric';
import Property from './Property';
import Schema from './Schema';
import URL from './URL';

const Count = withTranslator(CountBase);
const Numeric = withTranslator(NumericBase);

export {
  Count,
  Date,
  Entity,
  EnumValue as Country,
  EnumValue as Language,
  EnumValue as Topic,
  FileSize,
  Numeric,
  Property,
  Schema,
  URL,
};
