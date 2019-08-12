import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import RouteRenderer from '~/components/routeRenderer';

const render = Comp => props => (<Comp {...props} />);
const Home = render(lazy(() => import('~/modules/home')));
const Auth = render(lazy(() => import('~/modules/auth')));

const Routes = () => (
  <Suspense fallback={<div>loading...</div>}>
    <RouteRenderer>
      <Route path='/auth' component={Auth} />
      <Route exact path='/' component={Home} isPrivate={true} />
      <Route component={() => <div>Not Found (:)</div>} />
    </RouteRenderer>
  </Suspense>
);
export default Routes;
