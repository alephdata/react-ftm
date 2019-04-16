import defaultConfig from './rollup.config.ts';
import visualizer from 'rollup-plugin-visualizer';

const plugins = defaultConfig.plugins.concat(visualizer({open:true}))
export default {
  ...defaultConfig,
  plugins
}
