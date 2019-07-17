import React from 'react';
import cx from 'classnames';
import Navbar from '~/components/navbar';
import styles from './styles.scss';

export default ({ children, setShowSideBar }) => (
  <React.Fragment>
    <Navbar setShowSideBar={setShowSideBar} />
    <div className={cx(styles['main'], 'container')}>
      { children }
    </div>
  </React.Fragment>
);
