import React from 'react';
import { Formik } from 'formik';
import { object, string } from 'yup';

import styles from './styles.scss';
import Loader from '~/components/loader';

const renderError = (errors, touched, field) => {
  return errors[field] && touched[field] && <div className={styles['error-message']}>{errors[field]}</div>
}

export default ({
  onSubmit,
  isSignInUp,
  errorMessage,
  disabled,
  showLoader,
}) => {
  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={object().shape({
        username: isSignInUp ? string().min(6, 'Minimum length is 6').required('This field is required') : null,
        userIdentifier: string().min(6, 'Minimum length is 6').required('This field is required'),
        password: string().min(6, 'Minimum length is 6').required('This field is required'),
      })}
      initialValues={{ username: '', userIdentifier: '', password: ''}}>
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => {console.log({errors, touched});return(
        <form onSubmit={handleSubmit}>
          {
            isSignInUp && <>
              <div className={styles['input-wrapper']}>
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
              { renderError(errors, touched, 'username') }
            </>
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
          { renderError(errors, touched, 'userIdentifier') }
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
          { renderError(errors, touched, 'password') }
          {
            errorMessage && 
            <div className={styles['error-message']}>
              {errorMessage}
            </div>
          }
          <div className={styles['button-wrapper']}>
            {
              showLoader ? <Loader size='xs' /> : 
              <input
                className={`${styles['button']} ${styles['centered']} `}
                type='submit'
                value={`SIGN ${isSignInUp ? 'UP' : 'IN'}`}
                disabled={disabled}
              />
            }
          </div>
        </form>
      )}}
      </Formik>
  )
};
