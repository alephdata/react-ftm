import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';

import image from 'rollup-plugin-img'

const pkg = require('./package.json');
const external = pkg['peerDependencies'] && Object.keys(pkg['peerDependencies']);

export default {
  input: `src/index.ts`,
  output: [
    {file: pkg.main, name: 'vislib', format: 'umd', sourcemap: true},
    {file: pkg.module, format: 'es', sourcemap: true},
  ],
  external,
  watch: {
    include: 'src/**',
  },
  plugins: [
    json(),
    postcss({
      extensions: [ '.css', '.scss' ],
    }),
    image(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve({browser: true}),
    // Compile TypeScript files
    typescript({useTsconfigDeclarationDir: true}),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      namedExports: {
        "react-draggable": ['DraggableCore', 'DraggableEvent'],
        'prop-types': [
          'bool',
        ],
      }
    }),
    // Resolve source maps to the original source
    sourceMaps()
  ],
}
