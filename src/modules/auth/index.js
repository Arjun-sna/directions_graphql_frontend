import React from 'react';
import { Formik } from 'formik';

import styles from './styles.scss';

export default () => {
  return (
    <div className={styles['auth-container']}>
      <div className={styles['auth-wrapper']}>
        <Formik
          initialValues={{ username: '', password: ''}}>
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
              <div className={styles['input-wrapper']}>
                <input
                  className={styles['input-field']}
                  type='email'
                  name='email'
                  placeholder='Email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
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
                value='SIGN IN'
              />
            </form>
          )}
          </Formik>
      </div>
    </div>
  )
}
