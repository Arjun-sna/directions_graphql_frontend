import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

const render = Comp => props => (<Comp {...props} />);
const Home = render(lazy(() => import('~/modules/home')));

const Routes = () => (
  <div>
    <Suspense fallback={<div>loading...</div>}>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Suspense>
  </div>
);
export default Routes;
