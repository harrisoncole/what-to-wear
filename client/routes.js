import React from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import Hourly from './components/Hourly'
import User from './components/User'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/hourly" component={Hourly} />
      <Route exact path="/user" component={User} />
    </Switch>
  )
}

export default Routes
