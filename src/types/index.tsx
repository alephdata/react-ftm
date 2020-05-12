import { withTranslator } from '../Translator';

import CountBase from './Count';
import Country from './Country';
import DateBase from './Date';
import Entity from './Entity';
import FileSize from './FileSize';
import Language from './Language';
import NumericBase from './Numeric';
import Property from './Property';
import Schema from './Schema';
import Topic from './Topic';
import URL from './URL';

const Count = withTranslator(CountBase);
const Date = withTranslator(DateBase);
const Numeric = withTranslator(NumericBase);

export {
  Count,
  Country,
  Date,
  Entity,
  FileSize,
  Language,
  Numeric,
  Property,
  Schema,
  Topic,
  URL,
};
