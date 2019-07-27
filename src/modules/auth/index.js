import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { object, string } from 'yup';
import SignIn from '~/modules/auth/signIn';

import styles from './styles.scss';

const SIGN_IN = gql`
  mutation ($userIdentifier: String!, $password: String!) {
    signIn(userIdentifier: $userIdentifier, password: $password) {
      token
    }
  }
`
const fetchGraphqlError = (errorObject = {}) => {
  if (errorObject.graphQLErrors && errorObject.graphQLErrors.length) {
    return errorObject.graphQLErrors[0].message;
  }
}
const renderError = (errors, touched, field) => {
  return errors[field] && touched[field] && <div className={styles['error-message']}>{errors[field]}</div>
}

export default () => {
  const [isSignInUp, setIsSignInUp ] = useState(false);

  return (
    <Mutation mutation={SIGN_IN}>
      {(authAction, { data, loading, error }) => {
        console.log({data});
        if (data && data.signIn.token) {
          return <Redirect to="/" />
        }
        
        return (
          <div className={styles['auth-container']}>
            <div className={styles['auth-wrapper']}>
              <div style={{textAlign: 'center'}}>
                <span
                  onClick={() => setIsSignInUp(false)}
                  className={`${styles['auth-action']} ${!isSignInUp && styles['auth-action-active']}`}>
                  Sign In
                </span>
                |
                <span
                  onClick={() => setIsSignInUp(true)}
                  className={`${styles['auth-action']} ${isSignInUp && styles['auth-action-active']}`}>
                  Sign Up
                </span>
              </div>
              <SignIn />
            </div>
          </div>
          )
        }
      }
    </Mutation>
  )
}
