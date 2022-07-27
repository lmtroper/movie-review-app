import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import Landing from '../Landing';
import Search from '../Search';
import Reviews from '../Reviews';
import MyPage from '../MyPage';
import history from './history';

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (
    <Router history={history}>
      <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/reviews" exact component={Reviews} />
      <Route path="/search" exact component={Search} />
      <Route path="/movieTrailers" exact component={MyPage} />
      </Switch>
    </Router>
  );
}