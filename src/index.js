import React from 'react';
import App from './components/app/app';
import ReactDOM from 'react-dom/client';
import { configureFakeBackend } from './fake-api';

configureFakeBackend();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
