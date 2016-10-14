/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    home: [
      'whatwg-fetch',
      'zepto/src/zepto',
      'zepto/src/event',
      'zepto/src/touch',
      'zepto/src/fx',
      './src/index.js'
    ],
    index: [
      'whatwg-fetch',
      './src/entry.js'
    ],
    profile: [
      'whatwg-fetch',
      './src/profile.js'
    ]
  },
  debug: true,
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].[hash:8].js',
    publicPath: ''
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
    new HtmlWebpackPlugin({
      title: 'Thorgene',
      filename: 'init-profile.html',
      chunks: ['profile']
    }),
    new CopyWebpackPlugin([
      { from: './assets/' }
    ]),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify('test'),
      CORDOVA_ENV: process.env.CORDOVA_ENV ? JSON.stringify('true') : JSON.stringify('false')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
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