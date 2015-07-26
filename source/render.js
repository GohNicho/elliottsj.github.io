'use strict'

import React from 'react'
import Router from 'react-router'

import routes from './routes'

export default function render(path) {
  return new Promise(resolve => {
    Router.run(routes, path, Root => {
      resolve(React.renderToString(<Root />))
    })
  })
}
