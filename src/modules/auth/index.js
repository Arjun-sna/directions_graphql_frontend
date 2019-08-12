import React, { useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import SignIn from '~/modules/auth/signIn';
import SignUp from '~/modules/auth/signUp';

import styles from './styles.scss';


export default ({ history }) => {
  const [isSignInUp, setIsSignInUp ] = useState(false);
  const apolloClient = useApolloClient();
  const onSignInSuccess = (data) => {
    console.log(data);
    if (data.signIn && data.signIn.token) {
      localStorage.setItem('token', data.signIn.token)
      apolloClient.writeData({
        data: {
          userData: data.signIn.user
        }
      })
      history.push('/');
    }
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
        {
          isSignInUp ? 
            <SignUp
              onSuccess={() => setIsSignInUp(false)}
            /> :
            <SignIn
              onSuccess={onSignInSuccess}
            />
        }
      </div>
    </div>
  )
}
