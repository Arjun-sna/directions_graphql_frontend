import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.scss';

export default () => (
  <div className={styles['navbar']}>
    <div className={`${styles['nav-content']} container`}>
      <Link to='/' className={styles['logo']}>
        Directions
      </Link>
    </div>
  </div>
);
