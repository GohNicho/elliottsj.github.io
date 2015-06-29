'use strict'

import React from 'react'

export default class Home extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>Spencer Elliott</title>
        </head>
        <body>
          {this.props.children}
          <script src='/bundle.js'></script>
        </body>
      </html>
    )
  }
}

Home.propTypes = {
  children: React.PropTypes.node
}
