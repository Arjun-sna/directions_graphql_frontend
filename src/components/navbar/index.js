import React from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import styles from './styles.scss';
import { Menu, MenuButton, MenuContent } from '~/components/menu';
import { LOCAL_USER_DATA } from '~/modules/app/gqlQueries';

export default () => {
  const { data: { token, user } } = useQuery(LOCAL_USER_DATA);
  const apolloClient = useApolloClient();
  const logout = () => {
    
    apolloClient.resetStore();
  }
  
  return (
    <div className={styles['navbar']}>
      <div className={`${styles['nav-content']} container`}>
        <Link to='/' className={`${styles['logo']} ${!token && styles['align-center']}`}>
          Directions
        </Link>
        {
          token &&
          <Menu>
            <MenuButton><div className={styles['menu-btn']}>{ user.username }</div ></MenuButton>
            <MenuContent>
              <div className={styles['menu-item']} onClick={logout}>Logout</div>
            </MenuContent>
          </Menu>
        }
      </div>
    </div>
  )
};
