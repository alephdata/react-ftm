const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: './src/embed/index-dev.ts',
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  output: {
    filename: 'react-ftm.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
});
