const merge = require('webpack-merge');
const prod = require('./webpack.dev.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = merge(prod, {
    plugins: [
        new BundleAnalyzerPlugin()
    ]
})

module.exports = config;