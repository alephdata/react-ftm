const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    'react-ftm': './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(vis|ftm)$/,
        loader: 'json-loader'
      }
    ],
  },
  resolve: {
    modules: [path.resolve('src'), 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'NetworkDiagram': path.resolve('./src/components/NetworkDiagram')
    },
    fallback: {
      buffer: 'buffer',
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
    }
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
    // "@blueprintjs/core": ["Blueprint", "Core"],
    // "@blueprintjs/select": ["Blueprint", "Select"],
    // "classnames": "classNames",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'reactFTM',
    libraryTarget: 'umd'
  }
};
