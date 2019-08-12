import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoutes from '~/components/protectedRoutes';

const render = Comp => props => (<Comp {...props} />);
const Home = render(lazy(() => import('~/modules/home')));
const Auth = render(lazy(() => import('~/modules/auth')));

const Routes = () => (
  <Suspense fallback={<div>loading...</div>}>
    <Switch>
      <Route path="/auth" component={Auth} />
      <ProtectedRoutes
        defaultRouteRenderer={() => <div>Page Not Found</div>}
      >
        <Route exact path='/' component={Home} />
      </ProtectedRoutes>
    </Switch>
  </Suspense>
);
export default Routes;
