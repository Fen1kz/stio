/**
 * COMMON WEBPACK CONFIGURATION
 */

import path from 'path';
import webpack from 'webpack';
// import jsonImporter from 'node-sass-json-importer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import globals from './globals';

const isDevelopment = process.env.NODE_ENV === 'development';

console.log('webpack.client.babel', process.env.NODE_ENV);

export default () => ({
  devtool: isDevelopment ? 'eval' : 'source-map'
  , entry: isDevelopment
    ? ['react-hot-loader/patch'
      , 'webpack-hot-middleware/client'
      , './client/index.jsx']
    : './client/index.jsx'
  , output: { // Compile into js/build.js
    path: path.resolve(__dirname, 'dist/client/')
    , publicPath: isDevelopment ? '/' : '/'
    , filename: isDevelopment ? '[name].js' : '[name].[chunkhash].js'
    , chunkFilename: isDevelopment ? '[name].js' : '[name].[chunkhash].js'
  }
  , resolve: {
    extensions: ['.js', '.jsx']
    //, modulesDirectories: ['client', 'shared', 'node_modules']
  }
  , target: 'web' // Make web variables accessible to webpack, e.g. window
  , stats: false // Don't show stats in the console
  , plugins: [
    // new webpack.DefinePlugin(Object.assign({}, globals, {GLOBAL_BROWSER: 'true'}))
    //, new webpack.optimize.CommonsChunkPlugin('common.js')
    // , isDevelopment ? null : new webpack.optimize.UglifyJsPlugin({sourceMap: true, compress: {warnings: false}})
    , isDevelopment ? new webpack.HotModuleReplacementPlugin({quiet: false}) : null
    , new webpack.NoEmitOnErrorsPlugin()
    , new HtmlWebpackPlugin({
      template: 'client/index.html'
      , inject: true
      // , favicon: 'favicon.ico'
      , minify: isDevelopment ? null : {
        removeComments: true
        , collapseWhitespace: true
        , removeRedundantAttributes: true
        , useShortDoctype: true
        , removeEmptyAttributes: true
        , removeStyleLinkTypeAttributes: true
        , keepClosingSlash: true
        , minifyJS: true
        , minifyCSS: true
        , minifyURLs: true
      }
    })
  ].filter(p => !!p)
  , module: {
    rules: [{
      test: /\.jsx?$/ // Transform all .js files required somewhere with Babel
      , loader: 'babel-loader'
      , exclude: /node_modules/
      , query: {
        presets: isDevelopment
          ? [['es2015', {modules: false}], 'react', 'stage-2']
          : ['es2015', 'react', 'stage-2']
        , plugins: ['react-hot-loader/babel']
      }
    }, {
      // Transform our own .css files with PostCSS and CSS-modules
      test: /(\.css|\.scss)$/,
      exclude: /node_modules/,
      use: [
        {loader: 'style-loader'}
        , {loader: 'css-loader'}
        , {
          loader: 'sass-loader'
          , options: {
            sourceMap: isDevelopment
            // , importer: jsonImporter
          }
        }]
    }, {
      // Do not transform vendor's CSS with CSS-modules
      // The point is that they remain in global scope.
      // Since we require these CSS files in our JS or CSS files,
      // they will be a part of our compilation either way.
      // So, no need for ExtractTextPlugin here.
      test: /\.css$/,
      include: /node_modules/,
      loaders: ['style-loader', 'css-loader?minimize=false']
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader'
    }, {
      test: /\.(jpg|png|gif|mp3)$/,
      loader: 'file-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }]
  }
});
