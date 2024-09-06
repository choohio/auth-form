import React, { useState } from 'react';
import * as styles from './form.module.css';
import Spinner from '../spinner/spinner';

const Form = ({ user, setCurrentUser, isAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isFormValid = () => {
    return email.trim() !== '' && password.trim() !== '' && isEmailValid(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataObject = {
      email: email,
      password: password
    };
    setLoading(true);
    fetch('https://fake-api.com/users/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataObject)
      }).then(res => JSON.parse(res))
        .then((res) => {
          if (res.status === 200) {
            setCurrentUser(res.user);
            isAuthenticated(true);
          } else {
            setUserNotFound(true);
          }
          setLoading(false); 
        })
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!isEmailValid(value)) {
      setEmailError('Некорректный адрес электронной почты');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  }

  return (
    <>
      {
        loading ? (
          <Spinner />
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <h1 className={styles.formTitle}>Аутентификация</h1>
            <div className='group'>
              <label className={styles.label} htmlFor='email'>Почта:</label>
                <input
                  id='email'
                  onChange={handleEmailChange}
                  className={`${styles.input} ${emailError ? styles.inputError : ''}`}
                  type='email' 
                  required
                />
                {emailError && <p className={styles.error}>{emailError}</p>}
            </div>
            <div className='group'> 
              <label className={styles.label} htmlFor='password'>Пароль:</label>
              <input
                id='password'
                className={styles.input}
                onChange={handlePasswordChange}
                type='password'
                required
              />
            </div>
            <div className='group'>
            { userNotFound ? <p className={styles.error}>Неправильная почта или пароль</p> : null }
              <button className={styles.button} type='submit' disabled={!isFormValid()}>Войти</button>
            </div>
          </form>
        )
      }
    </>
  )
};

export default Form;
