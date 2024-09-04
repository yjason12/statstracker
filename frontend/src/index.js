import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SessionsContextProvider } from './context/SessionContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
// Import BrowserRouter from react-router-dom
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
      <BrowserRouter>
        <SessionsContextProvider>
          <App />
        </SessionsContextProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
