import React from 'react';
import styles from './Loading.module.scss';
import LoadingIndicatorIcon from '@/shared/assets/icons/Loading.svg';

const LoadingIndicator = () => {
  return (
    <div className={styles.root}>
      <LoadingIndicatorIcon className={styles.loader} />
    </div>
  );
};

export default LoadingIndicator;
