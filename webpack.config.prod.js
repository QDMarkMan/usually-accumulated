const config = require('./webpack.config.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const merge = require('webpack-merge')
module.exports = merge(config, {
  mode: "production", // for tree-shaking 可以说是在生产环境下自动开启了tree-shaking
  // mode: "development",
  plugins:[
    new BundleAnalyzerPlugin()
  ]
})