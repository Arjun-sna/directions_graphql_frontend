import React, { useState } from 'react';
import { Formik } from 'formik';

import styles from './styles.scss';

export default () => {
  const [isSignInUp, setIsSignInUp ] = useState(false);

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
                  name='identifier'
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
              <input
                className={`${styles['button']} ${styles['centered']} `}
                type='submit'
                value={`SIGN ${isSignInUp ? 'UP' : 'IN'}`}
              />
            </form>
          )}
          </Formik>
      </div>
    </div>
  )
}
