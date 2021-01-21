const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    'react-ftm-embed': './src/embed/index.ts'
  },
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['react-ftm-embed'],
      template: './src/embed/embed.html',
    }),
  ],
});
