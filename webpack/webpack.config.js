/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    home: [
      'webpack-hot-middleware/client',
      'whatwg-fetch',
      'zepto/src/zepto',
      'zepto/src/event',
      'zepto/src/touch',
      'zepto/src/fx',
      './src/index.js'
    ],
    index: [
      'webpack-hot-middleware/client',
      'whatwg-fetch',
      './src/entry.js'
    ]
  },
  debug: true,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[hash:8].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Thorgene',
      template: 'src/index.ejs',
      filename: 'app-home.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      title: 'Thorgene',
      filename: 'index.html',
      chunks: ['index']
    }),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify('default')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.css?$/,
        loaders: ['style', 'css']
      },
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpg|png)$/, loader: 'url'}
    ]
  }
};