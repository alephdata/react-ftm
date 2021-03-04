import 'index.scss';
import { renderDev } from 'embed/renderDev';
import { fetchLocalData } from 'embed/util';

const id = 'dev';
const data = fetchLocalData(id) || require('./sample.ftm');
const config = {
  writeable: true,
  containerProps: { style: { height: '100vh', width: '100vw' } }
};


renderDev({ id, type: 'NetworkDiagram', data, config });

// renderDev({ id, type: 'EntityTable', data, config });
