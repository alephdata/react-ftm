import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'


export default {
  input: `src/index.tsx`,
  output: [
    { file: 'public/dist/index.js', name:'vis2', format: 'iife', sourcemap: true },
  ],
  external: [ ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    json(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve({ browser:true }),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir : true, objectHashIgnoreUnknownHack:true}),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      namedExports: {
        'node_modules/react/index.js': ['createRef', 'createElement', 'Component', 'Fragment', 'PureComponent']
      }
    }),
    // Resolve source maps to the original source
    sourceMaps()
  ],
}
