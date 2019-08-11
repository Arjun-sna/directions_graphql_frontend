import React from 'react';
import PropTypes from 'prop-types';
import LoaderImage from 'assets/images/rolling.svg';
import styles from './styles.scss';

const Loader = ({ size, className }) => (
  <div className={`${styles['loader-container']} ${styles[size]} ${className}`}>
    <img src={LoaderImage} alt="Loading..." />
  </div>
);

Loader.propTypes = {
  size: PropTypes.oneOf([
    'sm',
    'xs',
  ]),
};

Loader.defaultProps = {
  size: 'sm',
};

export default Loader;
