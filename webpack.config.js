'use strict'



export default {
  entry: './source/index.js',
  output: {
    path: './build/',
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    preLoaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'eslint-loader' }
    ],
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    // new MyPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: './build'
  }
}
