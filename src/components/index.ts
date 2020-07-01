import { withTranslator } from '../Translator';

import { TableEditor as TableEditorBase } from './TableEditor';

const TableEditor = withTranslator(TableEditorBase);

export { TableEditor }

export * from './EdgeType'
export * from './EntityList'
export * from './EntityViewer'
export * from './GroupingViewer'
export * from './SearchBox'
export * from './Sidebar'
export * from './TableView'
export * from './Toolbar'
export * from './VertexMenu'
export * from './charts'
