import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const render = Comp => props => (<Comp {...props} />);
const Home = render(lazy(() => import('~/modules/home')));
const Auth = render(lazy(() => import('~/modules/auth')));

const Routes = () => (
  <Suspense fallback={<div>loading...</div>}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/auth" component={Auth} />
    </Switch>
  </Suspense>
);
export default Routes;
