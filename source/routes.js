'use strict'

import React from 'react'
import { Route } from 'react-router'

import Html from './components/Html'
// import Home from './components/Home'
import Projects from './components/Projects'

export default [
  <Route path='/' component={Html}>
    <Route path='/projects' component={Projects} />
  </Route>
]
