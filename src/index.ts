import { withTranslator } from './Translator';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/table/lib/css/table.css';

import './index.scss';

import { VisGraph as VisGraphIntl } from './VisGraph';
import { PropertyEditor as PropertyEditorIntl } from './editor';

export * from './layout'
export * from './editor'
export * from './renderer'
export * from './types'
export * from './EntityManager'
export * from './GraphConfig'
export * from './GraphLogo'
export * from './Viewport'
export * from './VisGraph'
export * from './utils'

const PropertyEditor = withTranslator(PropertyEditorIntl);
const VisGraph = withTranslator(VisGraphIntl);

export {
  PropertyEditor,
  VisGraph,
}
