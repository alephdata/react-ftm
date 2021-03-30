const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.js');

const prodConfig = {
  mode: 'production',
  devtool: false,
};

const lib = merge(prodConfig, common, {
  entry: './src/index.ts',
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
  output: {
    filename: 'react-ftm.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'reactFTM',
    libraryTarget: 'umd'
  }
});

const embed = merge(prodConfig, common, {
  name: 'react-ftm-embed',
  entry: './src/embed/index.ts',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/embed/index.html',
      scriptLoading: 'blocking',
      minify: false
    }),
  ],
  output: {
    filename: 'react-ftm-embed.js',
    path: path.resolve(__dirname, 'dist'),
  }
});

module.exports = [ lib, embed ];
