'use strict';

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');
const globals = require('./globals');

const config = {
  target: 'node'
  , entry: [
    'webpack/hot/poll?1000',
    './server/entry.js'
  ]
  , watch: true
  , externals: [nodeExternals({
    whitelist: [/^webpack\/hot/]
  })]
  , devtool: 'source-map'
  , output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, 'dist/server')
  }
  , resolve: {
    extensions: ['.js', '.jsx']
  }
  , module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {presets: ['stage-2']}
      }
    ]
  }
  , plugins: [
    new webpack.NamedModulesPlugin(),
    new WebpackShellPlugin({onBuildEnd: ['node dist/server/server.bundle.js']}),
    new webpack.HotModuleReplacementPlugin()

  ]
};

module.exports = config;