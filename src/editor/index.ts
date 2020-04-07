import { withTranslator } from '../Translator';

import { PropertyEditor as PropertyEditorBase } from './PropertyEditor';
import { SelectProperty as SelectPropertyBase } from './SelectProperty';
import { TableEditor as TableEditorBase } from './TableEditor';

// wrap standalone exported components with IntlProvider
const PropertyEditor = withTranslator(PropertyEditorBase);
const SelectProperty = withTranslator(SelectPropertyBase);
const TableEditor = withTranslator(TableEditorBase);

export { PropertyEditor, SelectProperty, TableEditor }

export * from './EdgeType'
export * from './EntityList'
export * from './EntityViewer'
export * from './GroupingViewer'
export * from './VertexSchemaSelect'
export * from './VertexSelect'
