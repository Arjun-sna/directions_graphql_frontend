import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

const render = Comp => props => (<Comp {...props} />);
const Home = render(lazy(() => import('~/modules/home')));
const Auth = render(lazy(() => import('~/modules/auth')));

const Routes = () => (
  <div>
    <Suspense fallback={<div>loading...</div>}>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/auth" />
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </Router>
    </Suspense>
  </div>
);
export default Routes;
