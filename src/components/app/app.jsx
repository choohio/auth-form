import React, { useState } from 'react';
import Form from '../form/form';
import Welcome from '../welcome/welcome';
import * as styles from './app.module.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className={styles.app}>
      {isAuthenticated 
      ? <Welcome currentUser={user} setCurrentUser={setUser} isAuthenticated={setIsAuthenticated} /> 
      : <Form user={user} setCurrentUser={setUser} isAuthenticated={setIsAuthenticated} />}
    </div>
  )
}

export default App;
