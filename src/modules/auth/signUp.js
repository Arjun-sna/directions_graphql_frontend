import React from 'react';
import { Mutation } from 'react-apollo';
import { SIGN_UP } from '~/modules/app/gqlQueries';
import AuthForm from '~/modules/auth/authForm';

const fetchGraphqlError = (errorObject = {}) => {
  if (errorObject.graphQLErrors && errorObject.graphQLErrors.length) {
    return errorObject.graphQLErrors[0].message;
  }
}

export default ({ onSuccess }) => {
  return (
    <Mutation
      onCompleted={onSuccess}
      mutation={SIGN_UP}>
      {(authAction, { data, loading, error }) => {
        
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
      }}
    </Mutation>
  )
}