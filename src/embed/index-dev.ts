import 'index.scss';
import { Entity } from '@alephdata/followthemoney';
import { renderEmbed } from 'embed/renderEmbed';
import { fetchLocalData, setLocalData } from 'embed/util';


const id = 'dev';
const data = fetchLocalData(id) || require('./sample.ftm');
const config = {
  writeable: true,
  containerProps: { style: { height: '100vh', width: '100vw' } }
};
const onUpdate = (entities:Array<Entity>, additionalData: any) => setLocalData(id, entities, additionalData);

renderEmbed({ id, type: 'NetworkDiagram', data, config, onUpdate });

// renderEmbed({ id, type: 'EntityTable', data, config, onUpdate });
