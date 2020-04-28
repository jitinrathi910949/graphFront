import React, {Suspense, lazy} from "react";
// import { Router, Route, IndexRoute, Switch } from "react-router";
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { history } from "./store/index";

const Test = lazy(() => import('./Pages/Test'));
const GraphPage = lazy(() => import('./Pages/Graph/GraphPage'));

const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Suspense fallback ={<div>loading...</div>}>
    <Switch>
    <Redirect exact from="/" to="/graph" />
     <Route path="/" component={GraphPage} />
       
    <Route path="/graph" component={GraphPage} />
    </Switch>
    </Suspense>
  </Router>
);

export default router;