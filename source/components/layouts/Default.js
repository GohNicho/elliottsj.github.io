'use strict'

import React from 'react'
import { RouteHandler } from 'react-router'

export default class Default extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>Spencer Elliott</title>
          <script async src='/bundle.js'></script>
        </head>
        <body>
          <RouteHandler />
        </body>
      </html>
    )
  }
}

Default.propTypes = {
  children: React.PropTypes.node
}
