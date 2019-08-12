import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import styles from './styles.scss';
import { LOCAL_USER_DATA } from '~/modules/app/gqlQueries';

export default () => {
  const { data: { token, user } } = useQuery(LOCAL_USER_DATA);
  
  return (
    <div className={styles['navbar']}>
      <div className={`${styles['nav-content']} container`}>
        <Link to='/' className={`${styles['logo']} ${!token && styles['align-center']}`}>
          Directions
        </Link>
        {
          token &&
          <Link to='/auth' className={styles['auth-menu']}>
            { user.username }
          </Link>
        }
      </div>
    </div>
  )
};
