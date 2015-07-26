'use strict'

import path from 'path'
import co from 'co'
import Immutable from 'immutable'

import routes from './source/routes'
import render from './source/render'

const asArray = value => Array.isArray(value) ? value : [value]

function collectPaths (route, prefix = '', paths = Immutable.Set()) {
  const prefixedPath = path.join(prefix, route.props.path || '')
  const childrenArray = asArray(route.props.children || [])
  const prefixedChildPaths = Immutable.List(childrenArray).flatMap(childRoute =>
    collectPaths(childRoute, prefixedPath, paths)
  )
  return paths
    .add(prefixedPath)
    .union(prefixedChildPaths)
}

export default {
  entry: './source/index.js',
  output: {
    path: './build/',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      // { test: /\.jsx?$/, exclude: /node_modules/, loader: 'eslint-loader' }
    ],
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    {
      apply(compiler) {
        compiler.plugin('emit', co.wrap(function* (compilation, done) {
          const routerPaths = collectPaths(routes).toList()
          const renderedPages = yield routerPaths.map(render).toArray()

          const outputPaths = routerPaths.map(p => path.join(p, 'index.html'))
          outputPaths.zip(renderedPages).forEach(([outputPath, renderedPage]) => {
            compilation.assets[outputPath] = {
              source: () => renderedPage,
              size: () => renderedPage.length
            }
          })
          done()
        }))
      }
    }
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: './build'
  }
}
