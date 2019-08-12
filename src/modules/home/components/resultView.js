import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_DIRECTION } from '~/modules/app/gqlQueries';
import Loader from '~/components/loader';
import RouteDetails from './routeDetails';

const fetchGraphqlError = (errorObject = {}) => {
  if (errorObject.graphQLErrors && errorObject.graphQLErrors.length) {
    return errorObject.graphQLErrors[0].message;
  }
}

export default ({ queryVariables }) => {
  const { loading, error, data } = useQuery(
    GET_DIRECTION,
    { variables: queryVariables }
  );
  
  if (loading) {
    return <Loader />
  }
  if (error) {
    return <div>{ fetchGraphqlError(error) }</div>
  }
  return (
    <RouteDetails data={data.direction}/>
  )
}