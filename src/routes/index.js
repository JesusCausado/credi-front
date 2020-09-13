import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";

import Home from "../pages/Home/index";
import Register from "../pages/Register/index";
import Login from "../pages/Login/index";
import PageError from "../components/PageError/index";
import Cliente from "../pages/Cliente/index";
import Prestamo from "../pages/Prestamo/index";


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
    path: '/cliente',
    component: Cliente,
  },
  {
    path: '/prestamo',
    component: Prestamo,
  },
  {
    path: '/usuario',
    component: Prestamo,
  },
  {
    component: PageError,
  }
]

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/login" name="Login Page" component={Login} />
      <ProtectedRoute />
    </Switch>
  </Router>
)

const ProtectedRoute = () => {
  const history = useHistory();
  useEffect(() => {
    var token = localStorage.getItem('myToken');
    if (token == null) {
      history.push('/login');
    }
  }, [history])
  return (
    <Switch>
      {routes.map((route, i) =>
        <Route
          key={i}
          exact
          path={route.path}
          component={route.component} />
      )}
    </Switch>);
};

export default Routes
