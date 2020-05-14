import { withTranslator } from '../Translator';

import ColorPicker from './ColorPicker';
import EntitySelectBase from './EntitySelect';
import EnumValueSelectBase from './EnumValueSelect';
import PropertyEditorBase from './PropertyEditor';
import PropertySelectBase from './PropertySelect';
import RadiusPicker from './RadiusPicker';
import SchemaSelect from './SchemaSelect';
import TextEditBase from './TextEdit';
import VertexSelect from './VertexSelect';

const EntitySelect = withTranslator(EntitySelectBase);
const EnumValueSelect = withTranslator(EnumValueSelectBase);
const PropertyEditor = withTranslator(PropertyEditorBase);
const PropertySelect = withTranslator(PropertySelectBase);
const TextEdit = withTranslator(TextEditBase);

export {
  ColorPicker,
  EntitySelect,
  EnumValueSelect as CountrySelect,
  EnumValueSelect as LanguageSelect,
  EnumValueSelect as TopicSelect,
  PropertyEditor,
  PropertySelect,
  RadiusPicker,
  SchemaSelect,
  TextEdit,
  VertexSelect,
};
