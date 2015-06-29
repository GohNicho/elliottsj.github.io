'use strict'

import React from 'react'
import { Router } from 'react-router'

import routes from './routes'

// Client render
if (typeof document !== 'undefined') {
  Router.run(routes, Router.HistoryLocation, Root => {
    React.render(<Root />, document.body)
  })
}

// Exported static site renderer
export default function render(locals, callback) {
  Router.run(routes, locals.path, Root => {
    callback(/* error */ null, React.renderToString(<Root />))
  })
}
