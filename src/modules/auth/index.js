import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { object, string } from 'yup';

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
              <Formik
                onSubmit={({ username, userIdentifier, password }) => {
                  authAction({ variables: { userIdentifier, password }})
                }}
                validationSchema={object().shape({
                  username: isSignInUp ? string().min(6, 'Minimum length is 6').required('This field is required') : null,
                  userIdentifier: string().min(6, 'Minimum length is 6').required('This field is required'),
                  password: string().min(6, 'Minimum length is 6').required('This field is required'),
                })}
                initialValues={{ username: '', userIdentifier: '', password: ''}}>
                {({
                  values,
                  errors,
                  status,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  isValid
                }) => (
                  <form onSubmit={handleSubmit}>
                    {
                      isSignInUp && <div className={styles['input-wrapper']}>
                        <input
                          className={styles['input-field']}
                          type='text'
                          name='username'
                          placeholder='Username'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                        />
                      </div>
                    }
                    <div className={styles['input-wrapper']}>
                      <input
                        className={styles['input-field']}
                        type='text'
                        name='userIdentifier'
                        placeholder={isSignInUp ? 'Email' : 'Email or Username'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.userIdentifier}
                      />
                    </div>
                      {errors.email && touched.email && <div>{errors.email}</div>}
                    <div className={styles['input-wrapper']}> 
                      <input
                        className={styles['input-field']}
                        type='password'
                        name='password'
                        placeholder='Password'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                    </div>
                    {
                      error && 
                      <div className={styles['error-message']}>
                        {fetchGraphqlError(error)}
                      </div>
                    }
                    <input
                      className={`${styles['button']} ${styles['centered']} `}
                      type='submit'
                      value={`SIGN ${isSignInUp ? 'UP' : 'IN'}`}
                      disabled={loading}
                    />
                  </form>
                )}
                </Formik>
            </div>
          </div>
          )
        }
      }
    </Mutation>
  )
}
