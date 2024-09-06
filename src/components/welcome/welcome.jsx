import React, { useState } from 'react';
import * as styles from './welcome.module.css';
import success from '../../assets/success.png'; 

const Welcome = ({ currentUser, setCurrentUser, isAuthenticated }) => {
  return (
    <div className={styles.welcome}>
      <h1 className={styles.title}>Добро пожаловать!</h1>
      <img className={styles.img} src={success} alt='Success' />
      <h2 className={styles.text}>Вы {`${currentUser.name}`} </h2>
      <button 
        className={styles.button}
        onClick={() => {
          isAuthenticated(false);
          setCurrentUser(null);
        }
        }>
          Выйти
      </button>
    </div>
  )  
}

export default Welcome;
