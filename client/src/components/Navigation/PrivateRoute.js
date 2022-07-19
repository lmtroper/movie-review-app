import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import Landing from '../Landing';
import Search from '../Search';
import Review from '../Reviews';
import history from './history';

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/reviews" exact component={Review} />
      <Route path="/search" exact component={Search} />
      <Route path="/myPage" exact component={Home} />
      </Switch>
    </Router>
  );
}