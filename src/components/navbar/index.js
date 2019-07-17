import React from 'react';
import { Link } from 'react-router-dom';
import LocationSelector from '~/components/locationView';
import styles from './styles.scss';

export default ({ setShowSideBar }) => (
  <div className={styles['navbar']}>
    <div className={`${styles['nav-content']} container`}>
      <Link to='/' className={styles['logo']}>
        NearBy
      </Link>
      <LocationSelector setShowSideBar={setShowSideBar} />
    </div>
  </div>
);
