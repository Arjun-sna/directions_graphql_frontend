import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { object, string } from 'yup';
import { SIGN_IN } from '~/modules/app/gqlQueries';
import AuthForm from '~/modules/auth/authForm';

import styles from './styles.scss';

const fetchGraphqlError = (errorObject = {}) => {
  if (errorObject.graphQLErrors && errorObject.graphQLErrors.length) {
    return errorObject.graphQLErrors[0].message;
  }
}

export default ({ onSuccess }) => {
  return (
    <Mutation mutation={SIGN_IN}>
      {(authAction, { data, loading, error }) => {
        if (data && data.signIn.token) {
          onSuccess();
        }

        return (
          <AuthForm
            isSignInUp={false}
            onSubmit={({ username, userIdentifier, password }) => {
              authAction({ variables: { userIdentifier, password }})
            }}
            disabled={loading}
            errorMessage={error && fetchGraphqlError(error)}
          />
        )
      }}
    </Mutation>
  )
}