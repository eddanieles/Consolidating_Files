import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import AppContainer from '../containers/AppContainer';
import Home from '../components/Home';
import Login from '../components/Login';
import LoanManager from '../components/LoanManager'
import Goals from '../components/Goals'
import Register from '../components/Register'


const router = (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={Login} />
      <Route path="/register" component={Register}/>
      <Route path="/home/(:userUID)" component={Home}/>
      <Route path="/loan/(:userUID)" component={LoanManager}/>
      <Route path="/goals/(:userUID)" component={Goals}/>
    </Route>
  </Router>
)
export default router;
