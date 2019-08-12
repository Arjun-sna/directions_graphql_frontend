import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_UP } from '~/modules/app/gqlQueries';
import AuthForm from '~/modules/auth/authForm';

const fetchGraphqlError = (errorObject = {}) => {
  if (errorObject.graphQLErrors && errorObject.graphQLErrors.length) {
    return errorObject.graphQLErrors[0].message;
  }
}

export default ({ onSuccess }) => {
  const mutationOptions = {
    onCompleted: onSuccess
  }
  const [authAction, { loading, error }] = useMutation(SIGN_UP, mutationOptions);
  
  return (
    <AuthForm
      isSignInUp
      onSubmit={({ username, userIdentifier, password }) => {
        authAction({ variables: { username, userIdentifier, password }})
      }}
      disabled={loading}
      errorMessage={error && fetchGraphqlError(error)}
      showLoader={loading}
    />
  )
}