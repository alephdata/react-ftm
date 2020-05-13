import { withTranslator } from '../Translator';

import CountBase from './Count';
import Date from './Date';
import Entity from './Entity';
import EntityEditBase from './EntityEdit';
import EnumValue from './EnumValue';
import EnumValueSelectBase from './EnumValueSelect';
import FileSize from './FileSize';
import NumericBase from './Numeric';
import Property from './Property';
import Schema from './Schema';
import TextEditBase from './TextEdit';
import URL from './URL';

const Count = withTranslator(CountBase);
const EntityEdit = withTranslator(EntityEditBase);
const EnumValueSelect = withTranslator(EnumValueSelectBase);
const Numeric = withTranslator(NumericBase);
const TextEdit = withTranslator(TextEditBase);

export {
  Count,
  Date,
  Entity,
  EntityEdit,
  EnumValue as Country,
  EnumValue as Language,
  EnumValue as Topic,
  EnumValueSelect as CountryEdit,
  EnumValueSelect as LanguageEdit,
  EnumValueSelect as TopicEdit,
  FileSize,
  Numeric,
  Property,
  Schema,
  TextEdit,
  URL,
};
