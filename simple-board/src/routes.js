import React from 'react'
import { Router, Route } from 'react-router'

import App from './components/App'
import Article from './containers/Article'
import Board from './containers/Board'

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/board" component={Board} />
    <Route path="/board/:id" component={Article} />
  </Router>
)

export default Routes
