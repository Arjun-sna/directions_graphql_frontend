import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { LOCAL_USER_DATA } from '~/modules/app/gqlQueries';
import Loader from '../loader';

export default ({
  children,
  defaultRouteRenderer
}) => {
  const { data: { token }, loading } = useQuery(LOCAL_USER_DATA);
  const routeRenderer = (Component) => (props) => !!token ? <Component {...props} /> : <Redirect to="/auth" />

  if (loading) {
    return <Loader />
  }

  return (
    <Switch>
      {
        React.Children.map(children, child => {
          const { component, ...rest } = child.props;
          return (
            <Route {...rest} render={routeRenderer(component)}/>
          )
        })
      }
      {defaultRouteRenderer && <Route render={defaultRouteRenderer} />}
    </Switch>
  );
}
