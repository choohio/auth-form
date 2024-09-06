import React from 'react';
import * as styles from './spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.loader}></div>
    </div>
    
  )
}

export default Spinner;
