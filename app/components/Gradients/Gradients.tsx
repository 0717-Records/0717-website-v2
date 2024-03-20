import React from 'react';
import styles from './styles.module.css';

const Gradients = () => {
  return (
    <div className='fixed -z-10'>
      <div className={styles['background-gradient']}></div>
      <div className={styles['bottom-gradient']}></div>
    </div>
  );
};

export default Gradients;
