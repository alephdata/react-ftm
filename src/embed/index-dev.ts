import 'index.scss';
import { renderEmbed } from 'embed/renderEmbed';
import { fetchLocalData, setLocalData } from 'embed/util';


const id = 'dev';
let data = fetchLocalData(id);
if (!data) {
  data = require('./sample.ftm');
  setLocalData(id, data)
}
const onUpdate = (updated: any) => setLocalData(id, updated);

const config = {
  writeable: true,
  containerProps: { style: { height: '100vh', width: '100vw' } }
};

renderEmbed({ id, type: 'NetworkDiagram', data, config, onUpdate });

// renderEmbed({ id, type: 'EntityTable', data, config, onUpdate });
