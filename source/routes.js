'use strict'

import React from 'react'
import { Route, DefaultRoute } from 'react-router'

import DefaultLayout from './components/layouts/Default'
import Home from './components/pages/Home'
import Projects from './components/pages/Projects'

export default (
  <Route path='/' handler={DefaultLayout}>
    <DefaultRoute handler={Home} />
    <Route path='projects' handler={Projects} />
  </Route>
)
