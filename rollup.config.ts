import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';

const pkg = require('./package.json');

export default {
  input: `src/index.ts`,
  output: [
    {file: pkg.main, name: 'react-ftm', format: 'umd', sourcemap: true},
    {file: pkg.module, format: 'es', sourcemap: true},
  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    json(),
    postcss({
      extensions: [ '.css', '.scss' ],
    }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    resolve(),
    // Compile TypeScript files
    typescript({check: false, useTsconfigDeclarationDir: true}),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Resolve source maps to the original source
    sourceMaps()
  ],
}
