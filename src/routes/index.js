import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "../pages/Home/index";
import Register from "../pages/Register/index";
import Login from "../pages/Login/index";
import PageError from "../components/PageError/index";


const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    component: PageError,
  }
]

const Routes = () => {
  return (
    <Router>
      <div >
        <Switch>
          {routes.map((route, i) =>
            <Route
              key={i}
              exact
              path={route.path}
              component={route.component} />
          )}
        </Switch>
      </div>
    </Router>

  );
}

export default Routes
