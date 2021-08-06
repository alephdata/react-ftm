import 'index.scss';
import { renderEmbed } from './renderEmbed';
import { fetchLocalData } from './util';

const id = 'dev';
const data = fetchLocalData(id) || require('./sample.ftm');
const config = {
  writeable: true,
  containerProps: { style: { height: '100vh', width: '100vw' } }
};


renderEmbed({ id, type: 'NetworkDiagram', data, config });

// renderEmbed({ id, type: 'EntityTable', data, config });
