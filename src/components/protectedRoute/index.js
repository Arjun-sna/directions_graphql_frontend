import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { LOCAL_USER_DATA } from '~/modules/app/gqlQueries';
import Loader from '../loader';

export default ({
  component: Component,
  ...rest
}) => {
  const { data: { token }, loading } = useQuery(LOCAL_USER_DATA);
  const routeRenderer = (props) => !!token ? <Component {...props} /> : <Redirect to="/auth" />

  if (loading) {
    return <Loader />
  }

  return (
    <Route
      {...rest}
      render={routeRenderer}
    />
  )
}