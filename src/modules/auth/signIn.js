import React from 'react';
import { Mutation } from 'react-apollo';
import { SIGN_IN } from '~/modules/app/gqlQueries';
import AuthForm from '~/modules/auth/authForm';

const fetchGraphqlError = (errorObject = {}) => {
  if (errorObject.graphQLErrors && errorObject.graphQLErrors.length) {
    return errorObject.graphQLErrors[0].message;
  }
}

export default ({ onSuccess }) => {
  return (
    <Mutation
      mutation={SIGN_IN}
      onCompleted={onSuccess}
      >
      {(authAction, { data, loading, error }) => {

        return (
          <AuthForm
            onSubmit={({ userIdentifier, password }) => {
              authAction({ variables: { userIdentifier, password }})
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