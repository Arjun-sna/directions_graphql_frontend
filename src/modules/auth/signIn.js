import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_IN } from '~/modules/app/gqlQueries';
import AuthForm from '~/modules/auth/authForm';
import { parseGraphqlError } from '~/utils';

export default ({ onSuccess }) => {
  const mutationOptions = {
    onCompleted: onSuccess
  }
  const [authAction, { loading, error }] = useMutation(SIGN_IN, mutationOptions);

  return (
    <AuthForm
      onSubmit={({ userIdentifier, password }) => {
        authAction({ variables: { userIdentifier, password }})
      }}
      disabled={loading}
      errorMessage={error && parseGraphqlError(error)}
      showLoader={loading}
    />
  )
}