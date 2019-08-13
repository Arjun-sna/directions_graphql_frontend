import React from 'react';
import cx from 'classnames';
import Navbar from '~/components/navbar';
import styles from './styles.scss';

export default ({ children }) => (
  <div className={styles['app-wrapper']}>
    <Navbar />
    <div className={cx(styles['main'], 'container')}>
      { children }
    </div>
  </div>
);
