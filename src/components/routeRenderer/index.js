import React from "react";
import Proptypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { LOCAL_USER_DATA } from "~/modules/app/gqlQueries";
import Loader from "../loader";

export default ({ children, defaultRouteRenderer }) => {
  const {
    data: { token },
    loading
  } = useQuery(LOCAL_USER_DATA);
  const routeRenderer = Component => props =>
    !!token ? <Component {...props} /> : <Redirect to="/auth" />;

  if (loading) {
    return <Loader />;
  }

  return (
    <Switch>
      {React.Children.map(children, child => {
        const { component, isPrivate, ...rest } = child.props;
        return isPrivate ? (
          <Route {...rest} render={routeRenderer(component)} />
        ) : (
          <Route {...rest} component={component} />
        );
      })}
      {defaultRouteRenderer && <Route render={defaultRouteRenderer} />}
    </Switch>
  );
};
