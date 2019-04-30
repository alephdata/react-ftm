import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

const pkg = require('./package.json');

export default {
  input: `src/vis2.ts`,
  output: [
    { file: pkg.main, name:'vis2', format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  external: [ 'react', 'react-dom', '@alephdata/followthemoney' ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    json(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve({ browser:true,}),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir : true, objectHashIgnoreUnknownHack:true}),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      namedExports:{
        "react-draggable":['DraggableCore', 'DraggableEvent']
      }
    }),
    // Resolve source maps to the original source
    sourceMaps()
  ],
}
